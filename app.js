// 1.取得容器
// 選取上下步驟的父容器
const formBtn = document.querySelector('.btn')
const preBtn = document.querySelector('.btn__pre')
const nextBtn = document.querySelector('.btn__next')
// 選取+ - 按鈕容器
const productBtn = document.querySelectorAll('.icon-content')
// 取得總金額
const productTotal = document.querySelector('.productTotal')
// 取得step狀態列
const steps = document.querySelectorAll('.step')
// 取得form
const form = document.querySelector('.form')
// 取得part
const formParts = form.querySelectorAll('.part')
// 取得dhl運費
const ship = document.querySelector('.ship-panel')
let step = 0
let total = 0

// 點擊運送方式，計算運費
ship.addEventListener('click',addShipPrice)

// 點選下一步按鈕,切換form內容
formBtn.addEventListener('click', clickFormBtn)
// 點擊+ - 號，計算商品金額
productBtn.forEach(function clickProductBtn(btn) {
  btn.addEventListener('click', addNumber)
})
// 切換form內容
function clickFormBtn(e) {  
  const nowStep = steps[step]
  if(e.target.matches('.btn__next')) {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('step--unselect')
    nowStep.classList.add('checked')
    nextStep.classList.add('checked')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn__pre')){
    const nextStep = steps[step - 1]
    nowStep.classList.add('step--unselect')
    nowStep.classList.remove('checked')
    nextStep.classList.remove('checked')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  // 改變下一步按鈕class名稱
  setBtnClass()
}

// 計算商品金額
function addNumber(e) {
  const target = e.target
  // 商品數量
  const number = target.parentNode.parentNode.children[1]
  // 商品價格
  const price = target.parentNode.parentNode.parentNode.children[2].innerText
  const priceNum = Number(price.replace(/[&\|\\\*^%$#@\-]/g,""))
  let numberBox = number.innerText
  if(target.matches('.bi-plus-circle-fill')) {
    numberBox ++
    total += priceNum 
  } else if(target.matches('.bi-dash-circle-fill')) {
    if (numberBox > 0) {
      numberBox --
      total -= priceNum 
    } 
  }
  number.innerText = numberBox
  productTotal.innerText = '$' + total.toLocaleString()

}
// 改變下一步按鈕class名稱
function setBtnClass() {
  if(step === 0) {
    preBtn.classList.add('btn--hide')
  } else {
    preBtn.classList.remove('btn--hide')
  }
  if(step === 2) {
    nextBtn.innerText = '確認下單'
  } else {
    nextBtn.innerText = '下一步'
  }
}
// 計算運費
function addShipPrice(e) {
  const shipPrice = 500
  if (e.target.matches('#flexRadioDefaultDHL')) {
    total += shipPrice
  } else if(e.target.matches('#flexRadioDefault')){
    if(total > 0) {
      total -= shipPrice
    }
  }
  productTotal.innerText = '$' + total.toLocaleString()
}





