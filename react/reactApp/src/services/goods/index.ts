// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 商品列表接口 GET /api/manage/product/list */
export async function getGoodsList(params: GOODSAPI.GoodsParams) {
  return request<GOODSAPI.GoodsList>('/api/manage/product/list', {
    params,
  });
}
export async function getGoodsSearch(params: GOODSAPI.GoodsParams) {
  return request<GOODSAPI.GoodsList>('/api/manage/product/search', {
    params,
  });
}
