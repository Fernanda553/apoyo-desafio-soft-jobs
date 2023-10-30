const HTTP_STATUS = {
  ok: { code: 200 },
  created: { code: 201 },
  not_found: { code: 404, text: 'Recurso no encontrado' },
  internal_server_error: { code: 500, text: 'Error interno del servidor' }
}

export default HTTP_STATUS
