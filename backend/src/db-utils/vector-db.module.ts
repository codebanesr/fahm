import { Module, Global } from '@nestjs/common';
import { VectorAdapterProvider } from './vector-db-factory/vector-db.provider';

@Global()
@Module({
  providers: [VectorAdapterProvider],
  exports: [VectorAdapterProvider],
})
export class VectorDBModule {}
