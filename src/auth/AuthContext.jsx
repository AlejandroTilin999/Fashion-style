import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { sanitizeText } from "../lib/sanitize";

const AuthContext = createContext(null);

function safeErrorCode(error) {
  const raw = String(error?.code ?? "unknown_error").toLowerCase();
  return raw.replace(/[^a-z0-9_./-]/g, "");
}

async function logEvent(type, payload) {
  try {
    const safePayload = Object.fromEntries(
      Object.entries(payload ?? {}).map(([k, v]) => [k, sanitizeText(v)])
    );
    const ref = doc(db, "logs", `${type}_${Date.now()}_${Math.random()}`);
    await setDoc(ref, { type, ...safePayload, createdAt: serverTimestamp() });
  } catch {
    // no exponer errores sensibles en UI
  }
}

async function getUserRole(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return "user";
  const data = snap.data();
  return data?.role === "admin" ? "admin" : "user";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        setRole(null);
        setLoading(false);
        return;
      }
      try {
        const r = await getUserRole(u.uid);
        setRole(r);
        await logEvent("access", { uid: u.uid, email: u.email ?? "", role: r });
      } catch (e) {
        await logEvent("error", { where: "onAuthStateChanged", code: safeErrorCode(e) });
        setRole("user");
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const api = useMemo(
    () => ({
      user,
      role,
      loading,
      async login(email, password) {
        const e = sanitizeText(email).trim();
        await signInWithEmailAndPassword(auth, e, password);
        await logEvent("login", { email: e });
      },
      async logout() {
        await signOut(auth);
      },
      async register({ name, email, password, requestedRole }) {
        const safeName = sanitizeText(name).trim();
        const safeEmail = sanitizeText(email).trim();
        const cred = await createUserWithEmailAndPassword(auth, safeEmail, password);
        if (safeName) await updateProfile(cred.user, { displayName: safeName });

        // “backend simulado”: coherencia / rol guardado en Firestore
        const roleToSave = requestedRole === "admin" ? "admin" : "user";
        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          email: safeEmail,
          name: safeName,
          role: roleToSave,
          createdAt: serverTimestamp(),
        });
        await logEvent("register", { email: safeEmail, role: roleToSave });
      },
    }),
    [user, role, loading]
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

