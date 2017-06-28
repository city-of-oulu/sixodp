<?php
  /**
  * More links template
  */

?>


<div class="headingbar">
  <h1 class="heading--main">
    <a href="<?php echo get_the_permalink($parent_page); ?>"><?php echo $parent_page->post_title; ?></a>
    <i class="material-icons">navigate_next</i>
    <span style="font-size: 2.2rem;">
      <?php the_title(); ?>
    </span>
  </h1>
</div>
