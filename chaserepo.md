app.js

'use strict';

const filter = [];

function Image(image) {
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    this.horns = image.horns;
    filter.push(this);
}

Image.prototype.render = function (container) {
    let $container = $(container);
    let $template = $('#photo-template');
    let $image = $template.clone();
    $image.removeAttr('id');
    $image.find('h2.image-name').text(this.title);
    $image.find('img.image-display').attr('src', this.image_url);
    $image.find('p').text(this.description);
    $container.append($image);
}

const keywords = [];
function makeMyMenu(image) {
    let $menu = $('.dropdown');
    // let $newOptions = $('.options');
    // let $createOptions = $newOptions.clone();
    // $createOptions.removeClass('options');

    let $createOptions = $("<option>");
    $createOptions.text(image.keyword);
    $createOptions.val(image.keyword);

    if (!keywords.includes(image.keyword)) {
        keywords.push(image.keyword);
        $menu.append($createOptions);
    }
};


const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

let images = null;
$.ajax('./data/page-1.json', ajaxSettings).then(function (data) {
    images = data;
    renderImages('default');

    //images.forEach(makeMyMenu);
    images.forEach(image => makeMyMenu(image));
});

function renderImages(filter) {
    $('main').empty();
    images.forEach((image) => {
        let displayImage = new Image(image);
        if (displayImage.keyword === filter) {
            displayImage.render('main');
        } else if (filter === 'default') {
            displayImage.render('main');
        }
    });
}

$('.dropdown').on('change', function() {
    let $this = $(this),
        filterValue = $this.val();

    console.log(filterValue);

    renderImages(filterValue);
})

html:

<!-- Note: you may use this starter code, but it is not a requirement -->

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8' />
    <title>The Gallery of Horns</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" type="text/css" href="css/reset.css" /> -->
    <link rel="stylesheet" type="text/css" href="css/base.css" />
</head>
  <body>

    <header>
      <h1>The Gallery of Horns</h1>
      <select class="dropdown">
        <option class="options" value="default">Filter by Keyword</option>
      </select>
    </header>

    <main>
    </main>

    <footer>
      &copy; 2018 Code Fellows
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="js/app.js"></script>

      <section id="photo-template">
        <h2 class="image-name"></h2>
        <img src="" alt="" class="image-display">
        <p></p>
      </section>

  </body>
</html>

Including page-2 app.js:
'use strict';

const filter = [];

function Image(image) {
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    this.horns = image.horns;
    filter.push(this);

    // for (let key in image) {
    //     this[key] = image[key];
    // }

}


//Mustache render prototype

// let animalId = '#animal-template';

Image.prototype.render = function () {
    let animal = $('#animal-template').html();
    let html = Mustache.render(animal, this);
    $('main').append(html);
}

// jQuery render prototype

// Image.prototype.render = function (container) {
//     let $container = $(container);
//     let $template = $('#photo-template');
//     let $image = $template.clone();
//     $image.removeClass();
//     $image.removeAttr('id');
//     $image.find('h2.image-name').text(this.title);
//     $image.find('img.image-display').attr('src', this.image_url);
//     $image.find('p').text(this.description);
//     $container.append($image);
// }

const keywords = [];

function makeMyMenu(image) {
    let $menu = $('.dropdown');
    let $createOptions = $("<option>");
    $createOptions.text(image.keyword);
    $createOptions.val(image.keyword);
    if (!keywords.includes(image.keyword)) {
        keywords.push(image.keyword);
        $menu.append($createOptions);
    }
};

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

let images = null;

$.ajax('./data/page-1.json', ajaxSettings).then(function (data) {
    images = data;
    renderImages('default');
    images.forEach(image => {
        makeMyMenu(image);
    });
});

$('.page1').on('click', function () {
    $.ajax('./data/page-1.json', ajaxSettings).then(function (data) {
        images = data;
        renderImages('default');
        images.forEach(image => {
            makeMyMenu(image);
        })
    });
})

$('.page2').on('click', function () {
    $.ajax('./data/page-2.json', ajaxSettings).then(function (data) {
        images = data;
        renderImages('default');
        images.forEach(image => {
            makeMyMenu(image);
        })
    });
})

function renderImages(filter) {
    $('main').empty();
    images.forEach((image) => {
        let displayImage = new Image(image);
        if (displayImage.keyword === filter) {
            displayImage.render();
        } else if (filter === 'default') {
            displayImage.render();
        }
    });
}


$('.dropdown').on('change', function () {
    let $value = $('.dropdown option:selected').text();
    if ($value === 'Filter by Keyword') {
        location.reload();
    }
    let $this = $(this),
        filterValue = $this.val();
    renderImages(filterValue);
})

function sortAlphabetical(a, b) {
    console.log(images);
    let imageTitleA = a.title;
    let imageTitleB = b.title;
    console.log('I am here');
    let comparison = 0;
    if (imageTitleA > imageTitleB) {
        comparison = 1;
    } else if (imageTitleA < imageTitleB) {
        comparison = -1;
    }
    return comparison;
}

function sortImages(arr) {
    console.log(arr);
    arr.sort((a, b) => {
        // console.log(images);
        let imageTitleA = a.title;
        let imageTitleB = b.title;
        // console.log('I am here');
        if (imageTitleA > imageTitleB) {
            return 1;
        } else if (imageTitleA < imageTitleB) {
            return -1;
        } else {
            return 0
        }
    });
    renderImages(arr);
}

$('.sort').on('click', () => sortImages(filter));

html:

<!-- Note: you may use this starter code, but it is not a requirement -->

<!DOCTYPE html>
<html>

<head>

  <meta charset='utf-8' />
  <title>The Gallery of Horns</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- <link rel="stylesheet" type="text/css" href="css/reset.css" /> -->
  <link rel="stylesheet" type="text/css" href="css/base.css" />
  <link rel="stylesheet" href="css/modules.css" />
  <link href="https://fonts.googleapis.com/css?family=Gotu&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet">
  <script id="animal-template" type="text/x-tmpl-mustache">
    <div>
      <h2 class="image-name">{{title}}</h2>
      <img src="{{image_url}}" alt="{{title}}" class="image-display" />
      <p>{{description}}</p>
    </div>
  </script>

</head>

<body>

  <header>
    <h1>The Gallery of Horns</h1>
    <select class="dropdown">
      <option class="options">Filter by Keyword</option>
    </select>
    <button class="page1" type="button">Page 1</button>
    <button class="page2" type="button">Page 2</button>
    <button class="sort" type="button">Sort A-Z</button>
  </header>


  <main>

  </main>

  <footer>
    &copy; 2018 Code Fellows
  </footer>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://unpkg.com/mustache@latest"></script>
  <script src="js/app.js"></script>

  <!-- <section class="hide" id="photo-template">
    <h2 class="image-name"></h2>
    <img src="" alt="" class="image-display"/>
    <p></p>
  </section> -->

</body>

</html>