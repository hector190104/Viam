import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // USUARIOS
  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  actualizarRol(id: number, nuevoRol: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/usuarios/${id}/rol?nuevoRol=${nuevoRol}`, {});
  }

  desactivarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  // PERFILES
  obtenerMiPerfil(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfiles/me?usuarioId=${usuarioId}`);
  }

  actualizarBiografia(usuarioId: number, biografia: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/perfiles/biografia?usuarioId=${usuarioId}&biografia=${encodeURIComponent(biografia)}`, {});
  }

  obtenerPerfilPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfiles/${id}`);
  }

  listarPerfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/perfiles`);
  }

  eliminarPerfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/perfiles/${id}`);
  }

  crearPerfil(perfil: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/perfiles`, perfil);
  }

  actualizarPerfil(id: number, perfil: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfiles/${id}`, perfil);
  }

  // GAMIFICACIÓN
  obtenerRanking(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gamificacion/ranking`);
  }

  obtenerMiProgreso(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/gamificacion/mi-progreso?usuarioId=${usuarioId}`);
  }

  obtenerGamificacionPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/gamificacion/${id}`);
  }

  crearGamificacion(gamificacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gamificacion`, gamificacion);
  }

  actualizarGamificacion(id: number, gamificacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/gamificacion/${id}`, gamificacion);
  }

  eliminarGamificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/gamificacion/${id}`);
  }

  listarGamificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gamificacion/gamificaciones`);
  }

  // ...existing code...

  // VERIFICACIÓN DE CORREO
  // enviarCodigoVerificacion(id: number): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/usuarios/${id}/enviar-codigo-verificacion`, {});
  // }

  // validarCodigoVerificacion(id: number, codigo: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/usuarios/${id}/validar-codigo-verificacion?codigo=${codigo}`, {});
  // }

  // ...existing code...

  // CURSOS
  crearCurso(curso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cursos`, curso);
  }

  actualizarCurso(id: number, curso: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cursos/${id}`, curso);
  }

  listarCursos(estado: string = 'ACTIVO'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cursos?estado=${estado}`);
  }

  obtenerCursoPorSlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos/${slug}`);
  }

  obtenerTodosLosCursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cursos/todos`);
  }

  obtenerCursoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos/id/${id}`);
  }

  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cursos/${id}`);
  }

  // ADMIN
  obtenerEstadisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/estadisticas`);
  }

  listarUsuariosPorRol(rol: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/usuarios?rol=${rol}`);
  }

  desactivarCurso(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/admin/cursos/${id}/desactivar`, {});
  }

  asignarRolInstructor(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/admin/usuarios/${id}/asignar-instructor`, {});
  }

  // EJEMPLO
  obtenerEjemplo(): Observable<string> {
    return this.http.get(`${this.apiUrl}/ejemplo`, { responseType: 'text' });
  }
}
