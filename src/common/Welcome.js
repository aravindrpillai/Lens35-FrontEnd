import React from "react";

export function Welcome() {

  return (
    <React.Fragment>
        <head>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap" rel="stylesheet" />
        <link href="css/style.css" type="text/css" rel="stylesheet" />
        <link href="css/responsive.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.js"></script>
        </head>
        <body>
        <div class="hero_area">
            <header class="header_section">
            <div class="container-fluid">
                <div class="row">
                <div class="col-lg-11 offset-lg-1">
                    <nav class="navbar navbar-expand-lg custom_nav-container ">
                    <a class="navbar-brand" href="#">
                        <img src="images/logo.png" alt="" />
                        <span>Lens35</span>
                    </a>
                    </nav>
                </div>
                </div>
            </div>
            </header>
            
            
            <section class=" slider_section position-relative">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-5 offset-md-1 ">
                        <div class="detail_box">
                            <h1>Lens35</h1>
                            <p>
                                Whether you're looking to capture family portraits, wedding photos, or simply beautiful shots of your everyday life, our team is here to help you tell your story through the lens of our cameras.
                                With our skilled photographers and top-of-the-line equipment, we are dedicated to creating stunning images that reflect the unique beauty and personality of each individual or occasion.
                            </p>
                            <div class="btn-box">
                            <a href="/emp/login" class="btn-1">
                                Photographers
                            </a>
                            <a href="/cust/login" class="btn-2">
                                Customers
                            </a>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6 px-0">
                        <div class="img-box">
                            <img src="images/slider-img.jpg" alt="" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
            </section>
        </div>


        <section class="container-fluid footer_section">
            <div class="container">
            <p> <a href="http://aravindrpillai.com/">aravindrpillai.com ||</a> <a href="https://html.design/">HTML Design</a> </p>
            </div>
        </section>

        

        </body>

    </React.Fragment>
  )
}
