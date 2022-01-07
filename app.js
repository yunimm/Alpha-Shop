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
const form = document.querySelector('.form')
const formParts = form.querySelectorAll('.part')
let step = 0
let total = 0

// 點選下一步按鈕
formBtn.addEventListener('click', clickFormBtn)

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
  setBtnClass()
}

function setBtnClass() {
  if(step === 0) {
    // preBtn.classList.remove('btn--hide')
    // preBtn.classList.add('btn--part1')
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



// 點擊+ - 號會執行addNumber
productBtn.forEach(function clickProductBtn(btn) {
  btn.addEventListener('click', addNumber)
})

// 點擊加號+1，點擊減號-1
function addNumber(e) {
  const target = e.target
  const number = target.parentNode.parentNode.children[1]
  const price = target.parentNode.parentNode.parentNode.children[2].innerText
  // console.log(price)
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
  productTotal.innerText = '$' + total

}



