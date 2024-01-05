import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Card, Form, Col, Row, Select, Input, theme, Table, Tag } from 'antd';
import { getGoodsList, getGoodsSearch } from '@/services/goods';

export default function GoodsList() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const columns: ColumnsType<GOODSAPI.Goods> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 150,
    },
    {
      title: '状态',
      key: 'status',
      width: 150,
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status === 1 ? (
            <>
              <Button size={'small'}>上架</Button>
              <span style={{ color: '#409eff', fontSize: 14 }}> 已下架</span>
            </>
          ) : (
            <>
              <Button size={'small'}>下架</Button>
              <span style={{ color: '#409eff', fontSize: 14 }}> 销售中</span>
            </>
          )}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button size={'small'}>详情</Button>
          <Button size={'small'}>修改</Button>
        </Space>
      ),
    },
  ];
  const [goodsList, setGoodsList] = useState<GOODSAPI.Goods[]>([]);
  const [params, setParams] = useState<GOODSAPI.GoodsParams>({
    pageNum: 1,
    pageSize: 10,
  });
  const querySearch = async (info: GOODSAPI.GoodsParams) => {
    setLoading(true);
    let { data } = await getGoodsSearch(info);
    setGoodsList(data.list);
    setTotal(data.total);
    setLoading(false);
  };
  
  const onSearch = async (values: any) => {
    let queryInfo: any = {};
    queryInfo[values['productType']] = values.key;
    setParams({
      pageNum: 1,
      pageSize: 10,
      ...queryInfo,
    });
    await querySearch({ pageNum: 1, pageSize: 10, ...queryInfo });
  };

  useEffect(() => {
    !(async () => {
      setLoading(true);
      let { data } = await getGoodsList(params);
      setGoodsList(data.list);
      setTotal(data.total);
      setLoading(false);
    })();
  }, []);

  return (
    <PageContainer>
      <Card>
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onSearch}>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item name="productType" initialValue={'productName'}>
                <Select placeholder="请选择">
                  <Option value="productName">名称 搜索</Option>
                  <Option value="productDesc">描述 搜索</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="key">
                <Input placeholder="请输入关键字" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Button type="primary" htmlType="submit">
                搜 索
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                重 置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Table
          bordered
          loading={loading}
          rowKey={'_id'}
          columns={columns}
          dataSource={goodsList}
          pagination={{
            showSizeChanger: true,
            showTotal: (total: number) => `共 ${total} 条`,
            current: params.pageNum,
            pageSize: params.pageSize,
            total: total,
            onChange: async (page: number, pageSize: number) => {
              setParams({
                ...params,
                pageNum: page,
                pageSize: pageSize,
              });
              await querySearch({
                ...params,
                pageNum: page,
                pageSize: pageSize,
              });
            },
          }}
        />
      </Card>
    </PageContainer>
  );
}
