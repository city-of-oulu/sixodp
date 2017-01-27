<?php
/**
* Hero -partial
*/
?>

<div class="hero">
  <div class="container">
    <div class="row">
      <h1 class="heading text-center">6Aika Open Data Portal</h1>
      <h3 class="subheading text-center">Avointa dataa vapaasti hyödynnettäväksesi</h3>  

      <div class="col-md-8 col-sm-12">
        <div class="row">
          <div class="col-md-4">
            <div class="input-group">
              <input type="text" class="form-control input-lg" aria-label="...">
              <div class="input-group-btn">
                <button type="button" class="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Tietoaineistot</a></li>
                  <li><a href="#">Sovellukset</a></li>
                  <li><a href="#">Artikkelit</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#">Muut</a></li>
                </ul>
              </div><!-- /btn-group -->
            </div><!-- /input-group -->
          </div>

          <div class="col-md-8">
            <input type="text" class="form-control input-lg" aria-label="...">
          </div>
        </div>
      </div>

    </div>
  </div>
  <?php include(locate_template('/partials/featured-stats.php')); ?>
</div>