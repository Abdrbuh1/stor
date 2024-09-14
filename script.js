// كلمة المرور الصحيحة
const correctPassword = "123456"; // يمكنك تغيير كلمة المرور كما تريد

// عرض صفحة إضافة المنتجات بعد إدخال كلمة المرور الصحيحة
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const enteredPassword = document.getElementById('password').value;
    
    if (enteredPassword === correctPassword) {
        // إخفاء نموذج تسجيل الدخول وإظهار قسم إضافة المنتجات
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('add-product-section').style.display = 'block';
    } else {
        // عرض رسالة خطأ
        document.getElementById('login-error').style.display = 'block';
    }
});

// إضافة المنتجات
document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // استرجاع المعلومات من المدخلات
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').value;

    // إنشاء رابط واتساب
    const whatsappNumber = "783495383"; // رقم الواتساب الخاص بك
    const whatsappMessage = `مرحبًا، أرغب في طلب المنتج: ${productName} بسعر ${productPrice} ريال يمني`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // إنشاء عنصر HTML جديد للمنتج
    const product = document.createElement('div');
    product.classList.add('product');
    product.innerHTML = `
        <img src="${productImage}" alt="${productName}">
        <h3>${productName}</h3>
        <p>السعر: ${productPrice} ريال يمني</p>
        <a href="${whatsappLink}" target="_blank" class="order-button">اطلب الآن</a>
    `;

    // إضافة المنتج إلى القائمة العامة
    document.getElementById('product-list').appendChild(product);

    // إضافة المنتج إلى قائمة المنتجات الخاصة بالإدارة مع زر الحذف
    const adminProduct = document.createElement('div');
    adminProduct.classList.add('product');
    adminProduct.innerHTML = `
        <img src="${productImage}" alt="${productName}">
        <h3>${productName}</h3>
        <p>السعر: ${productPrice} ريال يمني</p>
        <button class="delete-button">حذف المنتج</button>
    `;

    // إضافة المنتج إلى قائمة الإدارة
    document.getElementById('product-list-admin').appendChild(adminProduct);

    // إعادة تعيين المدخلات
    document.getElementById('add-product-form').reset();
});

// التعامل مع حذف المنتج
document.getElementById('product-list-admin').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const productToDelete = event.target.closest('.product');
        productToDelete.remove(); // حذف المنتج من قائمة الإدارة

        // أيضًا حذف المنتج من القائمة العامة إذا كانت له نفس الصورة والاسم
        const productName = productToDelete.querySelector('h3').textContent;
        const productImage = productToDelete.querySelector('img').src;

        const products = document.getElementById('product-list').querySelectorAll('.product');
        products.forEach(function(product) {
            const currentProductName = product.querySelector('h3').textContent;
            const currentProductImage = product.querySelector('img').src;

            if (currentProductName === productName && currentProductImage === productImage) {
                product.remove(); // حذف المنتج من القائمة العامة
            }
        });
    }
});
