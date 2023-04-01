<template>
  <div class='contact-container'>
    <li>
      <a href="">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ "data.githubName" }}</span>
      </a>
    </li>

    <li>
      <a href="###">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ "data.mail" }}</span>
      </a>
    </li>

    <li>
      <a
        href="###"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{"data.qq"}}</span>
      </a>
      <div class="pop">
        <!-- data.qqQrCode -->
        <img
          :src="url"
          alt=""
        />
      </div>
    </li>

    <li>
      <a>
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>{{ "data.weixin" }}</span>
      </a>
      <div class="pop">
        <!-- data.weixinQrCode -->
        <img
          :src="url"
          alt=""
        />
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon'
const url = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F21%2F20180721110514_TM5nj.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680687747&t=88ecb1c9ebcd661dc91443a8ef68bb75'

</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;
  li {
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .icon {
    font-size: 26px;
    width: 36px;
    &.weixin {
      font-size: 32px;
      text-indent: -3px;
    }
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: @itemHeight + 5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      bottom: -4px;
    }
  }
}
</style>