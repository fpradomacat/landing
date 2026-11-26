# Landing · instrucciones para Claude

- **Ejecuta siempre los tests antes de cada commit** (`cd tests && npm test`) y no hagas commit si fallan.
  Cada commit en `master` se publica solo y la publicación no espera a los tests de GitHub.
- El hook `.githooks/pre-commit` también los ejecuta; se activa con `git config core.hooksPath .githooks`.
