<?php
	$this->setGenerator("Uniwersytet SWPS" ) ;
	$app = JFactory::getApplication();
	$menu = $app->getMenu();
	$option = JRequest::getVar( 'option', '' );
	$view = JRequest::getVar( 'view', '' );
	$id = JRequest::getInt( 'id', 0 );
	$itemId = JRequest::getInt( 'Itemid', 0 );
	$uri_parts = explode("/", $_SERVER['REQUEST_URI']);
	$SWPS_HostCity = $uri_parts[1];
	$SWPS_HostCityModyfier = $uri_parts[2];
	$SWPS_HostCityVrble  = explode("?", $SWPS_HostCity );
	$SWPS_HostCity = $SWPS_HostCityVrble[0];
	$menu_act = $app->getMenu()->getActive();
  	$pageclass = $menu_act->params->get('pageclass_sfx');
	if(JRequest::getVar('option') == 'com_content' || JRequest::getVar('option') == 'com_breezingforms') {
		if(JRequest::getVar('view') == 'article') {
			$dbct=JFactory::getDbo();
    		$dbct->setQuery('SELECT catid FROM #__content WHERE id='.$id);
     		$catid=$dbct->loadResult();
			$catidCalssAdd = " cid". $catid;
		}
	}
	echo '<!-- id: ' . $id . ' option: ' . $option . ' view: ' . $view . ' Itemid" '.$itemId.' cid'. $catidCalssAdd . '-->';
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" >
<head>
	<script src="/media/jui/js/jquery.min.js" type="text/javascript"></script>

<!-- <link rel="apple-touch-icon" sizes="57x57" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/favicon-16x16.png">
<meta name="msapplication-TileImage" content="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/favicon/ms-icon-144x144.png">
<link rel="manifest" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/manifest.json"> -->
  <link rel="mask-icon" href="/images/common/swps-fav.svg" color="#fff" />
  <link rel="icon" href="/images/common/swps-fav.svg" />
  <style>@font-face{font-family:icomoon;src:url(<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/fonts/icomoon.woff?3o123m) format("woff");font-weight:400;font-style:normal;font-display:block}</style>
  <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/normalize.css" type="text/css" />
  <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/select2.min.css" type="text/css" />
  <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/icons.css" type="text/css" />
  <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/main.css" type="text/css" />
  <jdoc:include type="head" />
  <script src="/media/jui/js/jquery-noconflict.js" type="text/javascript"></script>
  <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/vendor/bundle.min.js" ></script>
  <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/dist/main.min.js" ></script>
  <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&display=swap&subset=latin-ext" rel="stylesheet">
  <script src="https://kit.fontawesome.com/5d8557cb28.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
  <meta name="google-site-verification" content="2qzyat7kvIo_j30akGt8fDMzAUFmLTAL_QkND0MEXSA" />
  <meta property="fb:app_id" content="172975309465300" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php
	if ($option == 'com_content' && $view == 'article') {
  ?>
  <meta name="productcode" content="swps<?php echo $id;?>">
  <?php
	}
  ?>
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" type="text/css" />
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" ></script>
  <?php
	if ($params->pageclass_sfx != '') {
		$pageclass_sfx = ' ' . $params->pageclass_sfx;
	}
	$additionalPageClass = '';
	$article_override = & JTable::getInstance('Content', 'JTable');
	$article_override_return  = $article_override->load(array('id'=>$id));
	$article_override = json_decode($article_override->attribs, 1);
	if ($article_override['article_layout'] == 'podstawowyswps:jednostka') {
		$catwydzialy = array(58,863,261,59,670,76,83,90,57,260);
		$catinstytuty = array(594,595,596,597,598);
		$catcentra = array(873,874,876,877,880);
		$catkatedry = array(866,864,869,860,865,864);
		if (in_array($catid, $catwydzialy)) {
			$additionalPageClass .= ' wydzial';
		} else if (in_array($catid, $catinstytuty)) {
			$additionalPageClass .= ' instytut';
		} else if (in_array($catid, $catcentra)) {
			$additionalPageClass .= ' centrum';
		} else if (in_array($catid, $catkatedry)) {
			$additionalPageClass .= ' katedra';
		} else {
			$additionalPageClass .= ' cosinnego';
		}
	}
	if ($id == 22164) {
		$dbszk=JFactory::getDbo();
    	$dbszk->setQuery('SELECT c.title, ct.title AS category FROM #__content c, #__categories ct WHERE c.id='. $_GET['item_id'].' AND c.catid = ct.id');
		$szkolenie = $dbszk->loadRow();

		 echo '<!-- ';

		 var_dump($szkolenie);

		 echo '-->';
?>
	<script type="text/javascript">
			jQuery (function($){
				$('#mauticform_input_zgloszenietrener_szkolenie1').prop('readonly',false).val("<?php echo $szkolenie[0]; ?>").prop('readonly',true);
				$('#mauticform_input_zgloszenietrener_miasto').val("<?php echo $szkolenie[1]; ?>");

			});
	</script>
<?php
	 }
?>
	<meta name="norton-safeweb-site-verification" content="o-07nm88qe1e9jcu88s1hfgdcykbl-9k0-jmwz1cu4s5q-7lp41m-rn75tajx9xoxzswn7d-7anft3cymelj6y6chcozxsn39gd-3v4v6kolyuw5we8jb2tj36lozoq2" />
	<meta name="robots" content="NOODP">
	<meta name='yandex-verification' content='6a07675e05ecff3b' />
	<meta name="google-site-verification" content="2qzyat7kvIo_j30akGt8fDMzAUFmLTAL_QkND0MEXSA" />
	
  </head>
  <body <?php echo 'class="'.htmlspecialchars($pageclass_sfx) . htmlspecialchars($pageclass).' aid' . $id; echo $additionalPageClass .' ' . $catidCalssAdd. '"'; ?>>
  <noscript><img height="1" width="1" src="https://www.facebook.com/tr?id=471983869853192&ev=PageView&noscript=1" alt="" /></noscript>
  <!-- <a id="topofpage"></a> -->
  <a href="#menu" class="skip-link">Przejdź do menu</a>
  <a href="#secondary-menu" class="skip-link">Nawiguj po głównych sekcjach</a>
  <a href="#content" class="skip-link">Przejdź do treści</a>
  <div class="search-wrapper">
  	<jdoc:include type="modules" style="none" name="top-search" />
  </div>
  <div class="appla"></div>
	<header id="top" class="black-nav">
    <jdoc:include type="modules" style="none" name="search-tooltip" />
		<div class="container">
      <button class="icon-lupka toggle-search js-toggle-search" aria-label="Wyszukiwarka" aria-expanded="false"></button>
      <button class="main-hamburger js-toggle-menu" aria-label="Menu głowne" aria-expanded="false"><img src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/img/svg/hamburger.svg" alt="" /><span class="close"></span></button>
  		<jdoc:include type="modules" style="xhtml" name="top" />
		</div>
	</header>
	<div id="content">
        <a name="content"></a>
        <jdoc:include type="modules" style="xhtml" name="over-content" />
        <jdoc:include type="component" />
        <jdoc:include type="modules" style="xhtml" name="content" />
		<jdoc:include type="modules" style="xhtml" name="below-content" />
	</div>
	<div id="bottom">
    	<jdoc:include type="modules" style="xhtml" name="bottom" />
	</div>

    	<jdoc:include type="modules" style="none" name="footer" />

  		<button class="back-to-top js-back-to-top" aria-label="Powrót na góre strony"><i class="icon-arrow" aria-hidden="true"></i></button>

	  <!-- BEGIN: Sales Manago -->
		<script type="text/javascript">
			var _smid = "gnl0drwpcqkrjzzn";
			(function(w, r, a, sm, s ) {
				w['SalesmanagoObject'] = r;
				w[r] = w[r] || function () {( w[r].q = w[r].q || [] ).push(arguments)};
				sm = document.createElement('script'); sm.type = 'text/javascript'; sm.async = true; sm.src = a;
				s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(sm, s);
			})(window, 'sm', ('https:' == document.location.protocol ? 'https://' : 'http://') + 'app2.salesmanago.pl/static/sm.js');
		</script>
		<!-- END: Sales Manago -->

		<!-- BEGIN: Ad Kontekst -->
		<script type='text/javascript'>
		var script = document.createElement('script');
		var src = (('https:' == document.location.protocol) ? 'https://' : 'http://');
		new Image().src = src+'adsearch.adkontekst.pl/getRetarget/?reid=593&nc='+new Date().getTime();
		</script>
		<script type='text/javascript'>
		var src = (('https:' == document.location.protocol) ? 'https://' : 'http://');
		new Image().src = src+'adsearch.adkontekst.pl/deimos/tracking/?tid=34359741754&reid=AKCS3386&expire=5&nc=1499769437495489052439';
		</script>
		<!-- END: Ad Kontekst -->

		<!-- BEGIN: Google Tag Manager -->
		<!-- Google Tag Manager -->
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-5VG4SSD');</script>
		<!-- End Google Tag Manager -->
		<!-- END: Google Tag Manager -->

		<!-- BEGIN: Google Tag Manager -->
		<!-- Google Tag Manager (noscript) -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5VG4SSD"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<!-- End Google Tag Manager (noscript) -->
		<!-- END: Google Tag Manager -->
	  
	</body>
</html>
