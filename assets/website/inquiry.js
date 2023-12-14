    //swiper

const swiper = new Swiper('.swiper', {

  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    scrollbar: {
      el: '.swiper-scrollbar',
    },
});

  //slide text
const obs = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    });
});
  
const hideCont = document.querySelectorAll('.info_text');
hideCont.forEach((el) => obs.observe(el));
  
    //Moving image

    function movingImage(event) {

      const imageone = document.getElementById('movingImage');
      const imagetwo = document.getElementById('movingImagetwo');
      const cursorX = event.clientX;
      const cursorY = event.clientY;

      const moveX = (cursorX / window.innerWidth - 0.5) * 100;
      const moveY = (cursorY / window.innerHeight - 0.5) * 100;

      imageone.style.transform = `translate(${moveX}px, ${moveY}px)`;
      imagetwo.style.transform = `translate(${moveX}px, ${moveY}px)`;  }