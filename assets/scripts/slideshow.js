document.addEventListener('DOMContentLoaded', function () {
    const slideshowElement = document.querySelector("[data-js-slideshow]");
    
    async function fetchJSON(url) {
        try {
          // after this line, our function will wait for the `fetch()` call to be settled
          // the `fetch()` call will either return a Response or throw an error
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          // after this line, our function will wait for the `response.json()` call to be settled
          // the `response.json()` call will either return the parsed JSON object or throw an error
          const data = await response.json();
          return data;
               
        } catch (error) {
          console.error(`Could not get data: ${error}`);
        }
      }
      
      

      const renderSlides = () => {

        const url = "../assets/data/slide-show.json"
        fetchJSON(url).then(data => {

            slideshowElement.innerHTML = data.slides.map((item, index) => {
                return `<li class="other-recipes-list__item ${index === 0 ? "is-active" : " "}" data-js-slide>
                <figure>
                    <img src="../images/other-recipes/${item.imagesrc}" alt="${item.caption}">
                    <figcaption>${item.caption}</figcaption>
                </figure>
                </li>`
            }).join(" ");
        })
      }

      renderSlides();
    
    const slideshow = (ele) => {

        let index = 0;
        //const slides = ele.querySelectorAll("[data-js-slide]");
        const slides = slideshowElement.children
        const back = document.querySelector("[data-js-slideshow-gui='back']");
        const forward = document.querySelector("[data-js-slideshow-gui='forward']");

        const goToSlide = (add) => {
            newIndex = index + add;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            } else if (newIndex > slides.length - 1) {
                newIndex = 0;
            };
            slides[index].classList.remove("is-active");
            slides[newIndex].classList.add("is-active");
            index = newIndex;
        };

        back.addEventListener("click", (event) => {
            event.preventDefault();
            goToSlide(-1);
        });

        forward.addEventListener("click", (event) => {
            event.preventDefault();
            goToSlide(1);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                goToSlide(-1);
            }
            if (event.key === "ArrowRight") {
                goToSlide(1);
            }
        });
    };

    slideshow(slideshowElement);
});

