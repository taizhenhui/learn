
export default function (defaultDataValue = null) {
  return {
    data() {
      return {
        isLoading: true,
        datas: defaultDataValue
      }
    },
    async created() {
      this.datas = await this.fetchData();
      this.isLoading = false;
    }
  }
}