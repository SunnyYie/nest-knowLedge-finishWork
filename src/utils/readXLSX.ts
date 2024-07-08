const XLSX = require('xlsx')

// 读取xlsx文件
export function readXLSXFile(filePath) {
  try {
    // 读取工作簿
    const workbook = XLSX.readFile(filePath)

    // 获取第一个工作表（你也可以通过名字来获取）
    const worksheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[worksheetName]

    // 将工作表数据转换为JSON对象数组
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) // 假设第一行是标题行

    // 你可以在这里对jsonData进行进一步处理或返回它
    return jsonData
  } catch (error) {
    console.error(`读取文件 ${filePath} 时发生错误:`, error)
  }
}
