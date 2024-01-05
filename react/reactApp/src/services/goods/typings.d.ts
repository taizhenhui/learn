declare namespace GOODSAPI {
  type GoodsParams = {
    pageNum?: number;
    pageSize?: number;
    productName?: string;
    productDesc?: string;
  };

  type Goods = {
    status?: number;
    _id?: string;
    name?: string;
    desc?: string;
    price?: number;
    imgs?: string[];
    pCategoryId?: string;
    categoryId?: string;
    detail?: string;
    specAttr?: any[];
    _v?: number;
  };

  type ResultData = {
    pageNum: number;
    pageSize: number;
    total: number;
    list: Goods[];
  };
  type GoodsList = {
    status: number;
    data: ResultData;
  };
  
}
