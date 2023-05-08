/**
 * 1. Btn choose image -> upload file -> show image -> Viết hàm loadImage()
 * 2. disable app, khi load ảnh lên mới dùng được app
 * 3. Xử lý khi click các nút filter: khi click nút thì thay tên,value của filter là tên nút
 * 4. Mỗi nút có 1 giá trị khác nhau-> phải giữ được giá trị khi thay đổi nút
 * 5. Chỉnh giá trị của  inversion, grayscale có max  là 100
 * 6. Apply filter on image
 * 7. Xử lý quay ảnh
 * 8. Reset filter button: chỉnh ảnh về mặc định
 * 9. Save image : từ document tạo 1 đối tượng canvas, canvas.context sẽ return 1 hình vẽ, áp những gì đã chỉnh sửa cho hình ảnh của canvas, download image
 * 10. reset filter value khi người dùng chọn ảnh mới
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const fileInput = $('.file-input');
const btnChooseImage = $('.choose-img')
const previewImage = $('.preview-img img');

const filterOptions = $$('.filter button')
const filterName = $('.filter-info .name');
const filterValue = $('.filter-info .value')
const filterSlider = $('.slider input');

const rotateOptions = $$('.rotate button')

const btnResetFilter = $('.reset-filter');
const btnSaveImage = $('.save-img');


let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

// Hàm xử lý
// Show ảnh
function loadImage() {
    let file = fileInput.files[0];
    if(!file) return;
    previewImage.src = URL.createObjectURL(file); // gán file cho src thẻ img rồi show lên

    // Khi load ảnh lên thì hết disable
    previewImage.addEventListener('load', () => {
        btnResetFilter.click();
        $('.container').classList.remove('disable');
    })
}
// Xử lý chỉnh sửa ảnh
function updateFilter(e) {
    filterValue.innerText =  `${filterSlider.value}%`;
    const selectedFilter = $('.filter .active');

    if (selectedFilter.id === 'brightness') {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === 'saturation') {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === 'inversion') {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}
function applyFilter() {
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)  grayscale(${grayscale}%)`;
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}
function resetFilter() {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // trả về filter đầu
    applyFilter();
}
function saveImage() {
    console.log("Save image successfully");
    const canvas = document.createElement("canvas"); // Tạo 1 đối tượng canvas
    const ctx = canvas.getContext("2d"); // chỉ định đối tượng canvas trả về 1 hình ảnh 2d
    canvas.width = previewImage.naturalWidth; 
    canvas.height = previewImage.naturalHeight;

    // apply user selected filters to canvas filter
    ctx.filter =  `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)  grayscale(${grayscale}%)`;
    // apply flip
    ctx.translate(canvas.width/2, canvas.height/2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImage, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    
    // download image
    const link = document.createElement("a"); 
    link.download = "img.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

btnChooseImage.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => loadImage())

// Xử lý khi click các nút để filter
filterOptions.forEach((option) => {
    option.addEventListener('click', () => {
        $('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if (option.id === 'brightness') {
            filterSlider.max = '200'
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (option.id === 'saturation') {
            filterSlider.max = '200'
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (option.id === 'inversion') {
            filterSlider.max = '100'
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = '100'
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    })
})
// Xử lý range điều chỉnh bộ lọc
filterSlider.addEventListener('input', updateFilter);


// Xử lý click nút rotate
rotateOptions.forEach((option) => {
    option.addEventListener('click', () => {
        switch(option.id) {
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
        }
        applyFilter();
    });
})


// Xử lý chỉnh ảnh về mặc định
btnResetFilter.addEventListener('click', resetFilter)
// Save image
btnSaveImage.addEventListener('click', saveImage)