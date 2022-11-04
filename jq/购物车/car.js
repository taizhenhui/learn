$(function () {
  init()
  $(".cart-item").hover(function(){
    $(this).toggleClass("check-cart-item")
  })
  // 全选功能
  $(".checkall").change(function () {
    $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
    getChecked()
  });
  $(".j-checkbox").change(function () {
    let len = $(".j-checkbox:checked").length;
    let listLen = $(".j-checkbox").length;
    if (len === listLen) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }
    getChecked()
  });
  
  // 商品数量增减
  $(".increment").click(function () {
    let n = $(this).siblings(".itxt").val();
    n++;
    $(this).siblings(".itxt").val(n);
    // 计算小计
    let text = $(this).parents(".p-num").siblings(".p-price").text();
    let sum = "¥" + (text.substr(1) * n).toFixed(2);
    $(this).parents(".p-num").siblings(".p-sum").text(sum);
    getChecked()
  });

  $(".decrement").click(function () {
    let n = $(this).siblings(".itxt").val();
    if (n == 1) {
      return;
    }
    n--;
    $(this).siblings(".itxt").val(n);
    // 计算小计
    let text = $(this).parents(".p-num").siblings(".p-price").text();
    let sum = "¥" + (text.substr(1) * n).toFixed(2);
    $(this).parents(".p-num").siblings(".p-sum").text(sum);
    getChecked()
  });

  // 计算小计
  $(".itxt").change(function () {
    console.log($(this).val());
    if ($(this).val() < 1) $(this).val(1);
    let text = $(this).parents(".p-num").siblings(".p-price").text();
    let sum = "¥" + (text.substr(1) * $(this).val()).toFixed(2);
    $(this).parents(".p-num").siblings(".p-sum").text(sum);
    getChecked()
  });
 
  function getChecked() {
    let count = 0 // 计算总件数
    let money = 0 // 计算总价
    $(".j-checkbox").each(function(i, ele){
      let isTrue = $(ele).prop("checked")
      if(isTrue){
      console.log(count,money);
      let val = $(ele).parents(".cart-item").find(".itxt").val()
      count += parseInt(val)
      
      let price = $(ele).parents(".cart-item").find(".p-sum").text()
      money += Number(price.substr(1))
    }
    $(".amount-sum em").text(count)
    $(".price-sum em").text("¥ "+ money.toFixed(2))
      
    })
  }
  getChecked()
  function init() {
    let count = 0 ,// 计算总件数
    money = 0; // 计算总价
    $(".price-sum em").text("¥ "+ money)
    $(".amount-sum em").text(count)
    $(".p-sum").each(function(i,ele){
     let n =  $(ele).siblings(".p-num").find(".itxt").val()
     let price = $(ele).siblings(".p-price").text().substr(1)
     $(ele).text("¥ "+ (n * price).toFixed(2))
    })
  }

  // 删除商品模块
  $(".p-action").click(function(){
    $(this).parents(".cart-item").remove()
    getChecked()
  })
  $(".remove-batch").click(function(){
    $(".j-checkbox:checked").parents(".cart-item").remove()
    getChecked()
  })
  $(".clear-all").click(function(){
    $(".cart-item").remove()
    getChecked()
  })

});
