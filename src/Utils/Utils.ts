

export class Utils {
  static shared = new Utils()

  vndFormat(num: number): string {
    return  new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(num)
  }
}