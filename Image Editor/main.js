// /**
//  * 1. Btn choose image -> upload file -> show image -> Viết hàm loadImage()
//  * 2. disable app, khi load ảnh lên mới dùng được app
//  * 3. Xử lý khi click các nút filter: khi click nút thì thay tên,value của filter là tên nút
//  * 4. Mỗi nút có 1 giá trị khác nhau-> phải giữ được giá trị khi thay đổi nút
//  * 5. Chỉnh giá trị của  inversion, grayscale có max  là 100
//  * 6. Apply filter on image
//  * 7. Xử lý quay ảnh
//  * 8. Reset filter button: chỉnh ảnh về mặc định
//  * 9. Save image : từ document tạo 1 đối tượng canvas, canvas.context sẽ return 1 hình vẽ, áp những gì đã chỉnh sửa cho hình ảnh của canvas, download image
//  * 10. reset filter value khi người dùng chọn ảnh mới
//  */

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const container = $('.container');
const btnFileInput = $('.controls .file-input');
const btnChooseImage = $('.controls .choose-img');
const imagePreview = $('.preview-img img');

const filterOptions = $$('.editor-panel .filter button');
const filterSlider = $('.slider input');
const nameFilter = $('.filter-info .name');
const valueFilter = $('.filter-info .value');

const rotateOptions = $$('.rotate .options button');

const btnResetFilter = $('.controls .reset-filter')
const btnSaveImage = $('.controls .save-img')

// console.log(btnSaveImage);
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;


// Khởi táo giá trị các filter

const app = {
    // module handle event
    logger: function() {
        console.log('rotate: ' + rotate);
        console.log('horizontal: ' + flipHorizontal);
        console.log('vertical: ' + flipVertical);
        // console.log('grayscale: ' + grayscale);
    },
    loadImage: function() {
        let file = btnFileInput.files[0];
        if(!file) return;
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.onload = () => {
            container.classList.remove('disable');
            btnResetFilter.click();
        }
    },
    updateFilter: function(e) {
        let optionSelected = $('.filter .active');
        switch (optionSelected.id) {
            case 'brightness':
                brightness = filterSlider.value;
                valueFilter.textContent = `${brightness}%`
                break;
            case 'saturation':
                saturation = filterSlider.value;
                valueFilter.textContent = `${saturation}%`
                break;
            case 'inversion':
                inversion = filterSlider.value;
                valueFilter.textContent = `${inversion}%`
                break;
            case 'grayscale':
                grayscale = filterSlider.value;
                valueFilter.textContent = `${grayscale}%`
                break;
        }
    },
    applyFilter: function() {
        imagePreview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
        imagePreview.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    },
    saveImage: function() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // set chiều dài và chiều rộng là kích thước ảnh tải lên
        canvas.width = imagePreview.naturalWidth;
        canvas.height = imagePreview.naturalHeight;
        // apply filter cho ảnh lưu về
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if(rotate !== 0) {
            ctx.rotate(rotate * Math.PI / 180)
        }
        ctx.scale(flipHorizontal, flipVertical);
        ctx.drawImage(imagePreview, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
        
        // Tiến hành lưu hình ảnh
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'img.jpg';
        link.click();
    },

    // event action
    handlerEvent: function() {
        // Xử lý click chọn ảnh và load ảnh
        btnFileInput.onchange = () => {this.loadImage()}
        btnChooseImage.onclick = () => {btnFileInput.click()};

        // Xử lý khi click các nút filter
        filterOptions.forEach((option) => {
            option.onclick = () => {
                let optionSelected = $('.filter .active');
                optionSelected.classList.remove('active');
                option.classList.add('active');
                nameFilter.textContent = option.textContent;
                
                switch (option.id) {
                    case 'brightness':
                        filterSlider.max = 200;
                        valueFilter.textContent = `${brightness}%`;
                        filterSlider.value = brightness;
                        break;
                    case 'saturation':
                        filterSlider.max = 200;
                        valueFilter.textContent = `${saturation}%`;
                        filterSlider.value = saturation;
                        break;
                    case 'inversion':
                        filterSlider.max = 100;
                        valueFilter.textContent = `${inversion}%`;
                        filterSlider.value = inversion;
                        break;
                    case 'grayscale':
                        filterSlider.max = 100;
                        valueFilter.textContent = `${grayscale}%`;
                        filterSlider.value = grayscale;
                        break;
                }
                //this.logger('');
            }
        });
        // Khi thay đổi giá trị filter thì value thay đổi và apply filter lên ảnh
        filterSlider.oninput = () => {
            this.updateFilter();
            this.applyFilter();
        }
        //Xử lý khi click các nút Rotate & Flip
        rotateOptions.forEach((option) => {
            option.onclick = () => {
                switch (option.id) {
                    case 'left':
                        rotate -= 90;
                        break;
                    case 'right':
                        rotate += 90;
                        break;
                    case 'horizontal':
                        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
                        break;
                    case 'vertical':
                        flipVertical = flipVertical === 1 ? -1 : 1;
                        break;
                }
                this.applyFilter();
            }   
            
        })

        // Khi click nút reset thì trả về ảnh ban đầu
        btnResetFilter.onclick = () => {
            brightness = 100;
            saturation = 100;
            inversion = 0;
            grayscale = 0;
            filterOptions[0].click();
            this.applyFilter();
        }
        // Khi click nút save thì tải hình ảnh đã chỉnh sửa về máy
        btnSaveImage.onclick = () => {
            this.saveImage();
        }
    },
    start: function() {
        this.handlerEvent()
    }
}

app.start();