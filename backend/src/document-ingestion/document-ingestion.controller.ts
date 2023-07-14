import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DocumentIngestionDto } from 'src/completion/dto';
import { VectorDBClient } from 'src/db-utils/vector-db-client.interface';
import { DocumentIngestionService } from './document-ingestion.service';
import { FileResponseDto } from './dto/file-response.dto';
import { RemoveDocumentsDto } from './dto/remove-documents.dto';
import { SuccessResponseDto } from './dto/success-response.dto';

@ApiTags('document-ingestion')
@Controller('document-ingestion')
export class DocumentIngestionController {
  constructor(
    private documentIngestionService: DocumentIngestionService,
    @Inject('VECTOR_DB_CLIENT') private readonly vectorDbClient: VectorDBClient,
  ) {}

  @Post('pdf')
  @ApiOperation({
    summary:
      "Ingests user's pdf document to vector database for querying later, this will be stored in a separate namespace and will be used for querying only for that user",
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: String })
  @UseInterceptors(
    FileInterceptor('file', { preservePath: true, dest: 'upload' }),
  )
  async parsePdfFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: DocumentIngestionDto,
  ) {
    return this.documentIngestionService.ingestUserDocuments(
      file,
      body.identifier,
    );
  }

  @ApiOperation({
    summary:
      "Remove a document by it's encoded value, this encoded value will be present in the response to uploads/:email",
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkResponse({ description: 'Documents removed successfully' })
  @Delete('/remove/:file_base64')
  async removeDocumentsByFilter(
    @Param('file_base64') file_base64: string,
    @Body() removeDocumentsDto: RemoveDocumentsDto,
  ) {
    try {
      return await this.documentIngestionService.removeDocumentsByFilter(
        file_base64,
        removeDocumentsDto,
      );
    } catch (error) {}
  }

  @ApiOperation({
    summary: 'Delete all documents from index',
    description: 'Deletes all documents from the specified Pinecone index',
  })
  @ApiResponse({
    status: 200,
    description: 'Success message',
    type: SuccessResponseDto,
  })
  @Delete('/remove/docs/all')
  async deleteAllDocs() {
    await this.vectorDbClient.deleteAllFromIndex(
      process.env.PINECONE_INDEX_NAME,
    );

    return { status: 'ok', done: true };
  }

  @ApiOperation({
    summary: 'Get all uploaded files for a user',
    description:
      'Returns a list of all the files uploaded for a specific user identified by their API key or email',
  })
  @ApiResponse({
    status: 200,
    description: 'Array of uploaded files',
    type: [FileResponseDto],
  })
  @Get('uploads/:identifier')
  async getAllUploadedFiles(@Param('identifier') identifier: string) {
    return this.documentIngestionService.getAllUploadedFiles(identifier);
  }
}
