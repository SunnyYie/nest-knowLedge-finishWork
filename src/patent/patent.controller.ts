import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Res, UseInterceptors, UploadedFile, Put } from '@nestjs/common'
import { PatentService } from './patent.service'
import { CreatePatentDto } from './dto/create-patent.dto'
import { createReadStream, existsSync, mkdirSync, readdirSync } from 'fs'
import { readXLSXFile } from 'src/utils/readXLSX'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { UpdateProposalDto } from 'src/proposal/dto/create-proposal.dto'

@Controller('api/patent')
export class PatentController {
  constructor(private readonly patentService: PatentService) {}

  @Post()
  async create(@Body() createPatentDto: CreatePatentDto) {
    const res = await this.patentService.create(createPatentDto)

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
      filePath = `E://WEB_1/Internship/Graduation_Design/nest-konw-ledge/src/patent/document/${query.title}/${query.fileName}`
    }

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': query.fileName ? `attachment; filename=${query.fileName}` : 'attachment; filename=template.xlsx',
    })

    createReadStream(filePath).pipe(res)
  }

  @Post('fileContent')
  readFileContent(@Body() body) {
    const dirPath = `E://WEB_1/Internship/Graduation_Design/nest-konw-ledge/src/patent/document/${body.title}`
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
          const destinationPath = `E://WEB_1/Internship/Graduation_Design/nest-konw-ledge/src/patent/document/${directoryName}`

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
    const res = await this.patentService.find({
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
    const res = await this.patentService.find({
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
    const res = await this.patentService.update(updateProposalDto._id, updateProposalDto)

    return {
      code: 0,
      msg: 'ok',
      data: Array.isArray(res) ? res : res.data,
      count: !Array.isArray(res) && res.count,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patentService.remove(id)

    return {
      code: 0,
      msg: 'ok',
    }
  }
}
