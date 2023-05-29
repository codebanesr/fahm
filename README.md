```sh
docker build -t hr_management_api .
```


---

```yaml
version: '3'

services:
  your-service:
    build:
      context: .
      dockerfile: Dockerfile
    env_file:
      - ./path/to/env.file
```