import { Controller, Get, Post, Body, Param, Delete, Req, Query, Put, Res, UseInterceptors, UploadedFile } from '@nestjs/common'
import { ProposalService } from './proposal.service'
import { CreateProposalDto, UpdateProposalDto } from './dto/create-proposal.dto'
import { createReadStream, mkdirSync, existsSync, readdirSync, readFileSync } from 'fs'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { readXLSXFile } from 'src/utils/readXLSX'

@Controller('api/proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  async create(@Body() createProposalDto: CreateProposalDto) {
    const res = await this.proposalService.create(createProposalDto)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    }
  }

  @Get('download')
  downloadFile(@Res() res, @Query() query) {
    let filePath
    if (query.title) {
      filePath = `E://WEB_1/Internship/Graduation_Design/nest-konw-ledge/src/proposal/document/${query.title}/${query.fileName}`
    } else {
      filePath = 'E://WEB_1/Internship/Graduation_Design/nest-konw-ledge/src/proposal/document/template.xlsx'
    }

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': query.fileName ? `attachment; filename=${query.fileName}` : 'attachment; filename=template.xlsx',
    })

    createReadStream(filePath).pipe(res)
  }

  @Post('fileContent')
  readFileContent(@Body() body) {
    const dirPath = `E://WEB_1/Internship/Graduation_Design/nest-konw-ledge/src/proposal/document/${body.title}`
    try {
      const dirList = readdirSync(dirPath, 'utf-8')

      if (dirList.length === 0) {
        return {
          code: 1,
          msg: '文件夹为空',
        }
      } else {
        const data = dirList.map((item) => {
          return {
            fileName: item,
            file: readXLSXFile(`${dirPath}/${item}`),
          }
        })

        return {
          code: 0,
          msg: 'ok',
          data: data,
        }
      }
    } catch (error) {
      return {
        code: 1,
        msg: '文件夹不存在',
      }
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const directoryName = req.query.id
          const destinationPath = `E://WEB_1/Internship/Graduation_Design/nest-konw-ledge/src/proposal/document/${directoryName}`

          // 确保目录存在
          if (!existsSync(destinationPath)) {
            mkdirSync(destinationPath, { recursive: true })
          }

          cb(null, destinationPath)
        },
        filename: (req, file, cb) => {
          const randomName = file.originalname
          cb(null, randomName)
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return { status: 'success', fileName: file.originalname }
  }

  @Get(':user_id')
  async findAll(@Param('user_id') user_id, @Req() requset) {
    const res = await this.proposalService.find({
      user_id: user_id,
    })

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    }
  }

  @Get()
  async findOne(@Query() query) {
    const res = await this.proposalService.find({
      ...query,
    })

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    }
  }

  @Put()
  async update(@Body() updateProposalDto: UpdateProposalDto) {
    const res = await this.proposalService.update(updateProposalDto._id, updateProposalDto)

    return {
      code: 0,
      msg: 'ok',
      data: Array.isArray(res) ? res : res.data,
      count: !Array.isArray(res) && res.count,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.proposalService.remove(id)

    return {
      code: 0,
      msg: 'ok',
    }
  }
}
