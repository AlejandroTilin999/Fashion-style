# Auditoria de Red Local - MODA Tienda

## Herramienta
- Nmap (recomendado) o Angry IP Scanner.

## Estado actual
- En este equipo, `nmap` no esta instalado.
- IP local detectada: `192.168.0.115`.

## Comandos sugeridos (Nmap)
1. Descubrimiento de hosts:
```powershell
nmap -sn 192.168.0.0/24
```

2. Escaneo de puertos del host app:
```powershell
nmap -sV -p 1-1024 192.168.0.115
```

3. Escaneo completo TCP:
```powershell
nmap -sV -p- 192.168.0.115
```

## Plantilla de resultados para la entrega
### Puertos abiertos identificados
- Ejemplo: `5173/tcp open http` (Vite dev server)
- Ejemplo: `135/tcp`, `139/tcp`, `445/tcp` (servicios Windows)

### Servicios detectados
- `http` en puerto `5173` (aplicacion web de desarrollo)
- Servicios del sistema operativo (si aparecen)

### Riesgos detectados
- Exposicion de puertos innecesarios de sistema al segmento local.
- Uso de servidor en modo desarrollo fuera de localhost.
- Falta de firewall/restriccion por red o perfil.

### Puertos innecesarios
- Todo puerto no relacionado con la app (`5173`) o con administracion requerida.
- Puertos SMB/NetBIOS en redes no confiables.

### Nivel de seguridad (criterio academico)
- **Medio** en desarrollo local.
- Puede subir a **Medio-Alto** con endurecimiento (firewall + despliegue controlado + reverse proxy).

### Recomendaciones
1. Abrir solo el puerto de la app durante pruebas y cerrarlo al terminar.
2. Aplicar reglas de firewall para limitar origen (solo IPs del laboratorio).
3. No ejecutar en modo dev para entornos productivos.
4. Revisar periodicamente con Nmap y documentar cambios.
5. Configurar HTTPS/proxy para exposicion externa.
