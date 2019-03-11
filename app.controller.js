(function(angular){
'use strict';

function ctrl($window, $document, $scope, $interval, $sce, utils){

	var body,  bnnFirstTerm = 1113, dbgTotal = 4877, // 14 May  1948 – 26 Jan 1954 |  3 Nov 1955 - 26 June 1963 (4877)
	    k = 1000*60*60*24, isMobile, orientation,
	    bnn1stDay = new Date(2009, 2, 31, 0, 0, 0, 0), now = new Date(),
	    bnn2ndTermSoFarInDays = Math.ceil((now - bnn1stDay)/k),
		bnnTotalInDays = bnnFirstTerm + bnn2ndTermSoFarInDays;
    var urlParams = new URLSearchParams(window.location.search);
    this.lang = 'he';
    if(urlParams.has('lang') === true){
        this.lang = urlParams.get('lang');
    	if(this.lang !== 'en' && this.lang !== 'he'){
            this.lang = 'he';
		}
	}

	this.settings = {};
	this.loadingIndicator = true;
	//start: calculate when is dDay
	this.diffInDays = dbgTotal - bnnTotalInDays;
	this.diffInMillis  = this.diffInDays * k;
	this.dDay = new Date(new Date().valueOf() + this.diffInMillis).setHours(0, 0,0,0);
	//end: calculate when is dDay

	this.millis = 0;
	this.secs  = 0;
	this.mins  = 0;
	this.hours = 0;
	this.days = 0;
	isMobile  =　utils.isMobileDevice(); // true
	orientation = utils.detectOrientation();//'landscape' 'portrait'

	function initializeSettings(orientation){
		this.settings =	{
			header: {
				title: this.lang === 'en'? "History!!!":"אוטוטו היסטוריה!!",
				subTitlePrefix: this.lang === 'en'? "In just":"עוד",
				subTitlePostfix: this.lang === 'en'? "days Netanyahu breaks Ben-Gurion's record": "ימים נתניהו שובר את השיא של בן-גוריון"
			},
			btnWhen: this.lang === 'en'? '20th July 2019':'20 ביולי 2019',
			clickForDetails: this.lang === 'en'? 'More details':'לחץ לפירוט',
            privacyLink: this.lang === 'en'? 'Privacy Policy':'תנאי פרטיות',
			stopWatchLabels: {
				days: this.lang === 'en'? "Days":"ימים",
				hours: this.lang === 'en'? "Hours":"שעות",
				minutes: this.lang === 'en'? "Minutes":"דק'",
				seconds: this.lang === 'en'? "Seconds":"שניות"
			},
			inDateLabel: this.lang === 'en'? "Due Date:":"בתאריך:",
			containerSettings: {
				widthRatio : isMobile ? (orientation === 'portrait' ? 0.9  : 0.5) : 0.6,
				heightRatio: isMobile ? (orientation === 'portrait' ? 0.6  : 0.7) : 0.75,
				topRatio   : isMobile ? (orientation === 'portrait' ? 0.23 : 0.05) : 0.18,
				width      : null,
				height     : null,
				left       : null,
				top        : null,
				bottom: null
			},
			diagram: {
				position: {
					xRatio: isMobile ? 0.14 : 0.15,
					x     : null,
					yRatio: isMobile ? 0.05 : 0.25,
					y     : null
				},
				dimentions: {
					widthRatio : isMobile ? 0.8 : 0.7,
					width      : null,
					heightRatio: 0.6,
					height     : null
				},
				axis: {
					horizontal: {
						ticks: {
							paddingRatio: isMobile ? ( orientation === 'landscape' ? 0.1 : 0.07) : 0.032,
							padding     : null,
							imageDimentions: {
								widthRatio : isMobile && orientation === 'landscape' ? 0.2 : 0.25,
								heightRatio: isMobile && orientation === 'landscape' ? 0.2 : 0.25,
								
								widthRatio : isMobile ? (orientation === 'landscape' ? 0.2 : 0.25) : 0.2,
								heightRatio: isMobile ? (orientation === 'landscape' ? 0.2 : 0.25) : 0.2,
								
								width      : null,
								height     : null
							},
							images: [
								{
									url: 'images/aa.jpg',
									left: null,
									top: null,
									tooltip: {
										info: [
											$sce.trustAsHtml(this.lang === 'en' ? "17 <div class='info-month'>MAY</div> 1948 - 26 <div class='info-month'>JAN</div> 1954: 2084 days" : "17 <div class='info-month'>מאי</div> 1948 - 26 <div class='info-month'>ינו'</div> 1954: 2084 ימים"),
											$sce.trustAsHtml(this.lang === 'en' ? "03 <div class='info-month'>NOV</div> 1955 - 26 <div class='info-month'>JUN</div> 1963: 2793 days" : "03 <div class='info-month'>נוב'</div> 1955 - 26 <div class='info-month'>יוני</div> 1963: 2793 ימים"),
											$sce.trustAsHtml(this.lang === 'en' ? "total: 4877 Days" : "סה'כ: 4877 ימים" )
										],
										isOpen: isMobile ? false : true,
										popupDelay: isMobile ? 0 : 2000,
										position: isMobile ? 'top' : 'left',
										class: 'tooltip-parent-dbg ' + this.lang
									}
								},
								{
									url: 'images/netanyahu_a.jpg',
									left: null,
									top: null,
									tooltip :{
										info: [
											$sce.trustAsHtml(this.lang === 'en' ? "18 <div class='info-month'>JUN </div>1996 - 06 <div class='info-month'>JUL</div> 1999 <div style='display:inline-block'>: 1113 days</div>" : "18 <div class='info-month'>יוני</div> 1996 - 06 <div class='info-month'>יולי</div> 1999<div style='display:inline-block'>: 1113 ימים</div>"),
											$sce.trustAsHtml(this.lang === 'en' ? "31 <div class='info-month'>MAR </div>2009 - Today <div style='display:inline-block' class='bnn-2nd-row'>: "+ bnn2ndTermSoFarInDays +" days</div>" : "31 <div class='info-month'>מרץ</div> 2009 - היום<div style='display:inline-block' class='bnn-2nd-row'>: "+ bnn2ndTermSoFarInDays +" ימים</div>"),
											$sce.trustAsHtml(this.lang === 'en' ? "total: "+ bnnTotalInDays +" Days" : "סה'כ: "+ bnnTotalInDays +" ימים")
										],
										isOpen: isMobile ? false : true,
										popupDelay: isMobile ? 0 : 2000,
										position: isMobile ? 'top' : 'right',
										class: 'tooltip-parent-bnn ' + this.lang,
									}
								}
							]
						}
					},
					vertical: {
						legend: {
						    text     : this.lang === 'en'? "Days as Prime-Minister" : "מספר ימים כראש-הממשלה",
                            top      : null,
                            left     : isMobile ? 10 : 15,
                            width    : null,
                            height   : null,
                            fontSize : isMobile ? 11 : 14,
                        },
						tickFontSizeRatio : isMobile ? 0.04 : 0.025,
						ticks: [
							{
							    days: dbgTotal,
							    left: 0,
							    top : 0,
							    width:0,
							    fontSize: 16
						    },
							{
							    days: bnnTotalInDays,
							    left:  0,
							    top :  0,
							    width: 0,
							    fontSize: 16
						    }
						]
					}
				},
				bars: {
					dimentions: {
						highestBarRatio         : 0.75,
						widthRatio              : 0.18,
						firstBarAxisOffsetRatio : 0.25,
						firstBarAxisOffset      : null,
						spaceBetweenBarsRatio   : 0.40,
						spaceBetweenBars        : null
					},
					model: [
						{
							fill    : 'url(#gradientDbg)',
							from    : 0,
							width   : 0,
							height  : 0,
							top     : 0,
							left    : 0
						},
						{
							fill    : 'url(#gradientBnn)',
							from    : 0,
							width   : 0,
							height  : 0,
                            top     : 0,
                            left    : 0
						}
					]
				}
			}
		};
	}

	angular.element($document[0]).ready(function () {
		$scope.$apply(function(){
			body = $document[0].querySelector('body');
			initializeSettings.call(this, orientation);
			calcDimentions.call(this);
			this.loadingIndicator = false;
		}.bind(this));
	}.bind(this));

	function calcDimentions(){

		this.settings.containerSettings.width  = Math.floor( this.settings.containerSettings.widthRatio  * body.clientWidth  );
		this.settings.containerSettings.height = Math.floor( this.settings.containerSettings.heightRatio * body.clientHeight );
		this.settings.containerSettings.left   = Math.floor( ((1 - this.settings.containerSettings.widthRatio)/3) * body.clientWidth   );
		this.settings.containerSettings.top    = Math.floor( this.settings.containerSettings.topRatio * body.clientHeight );

		this.settings.diagram.dimentions.width  = Math.floor(this.settings.containerSettings.width  * this.settings.diagram.dimentions.widthRatio);
		this.settings.diagram.dimentions.height = Math.floor(this.settings.containerSettings.height * this.settings.diagram.dimentions.heightRatio);
		//horizontal sizes
		this.settings.diagram.position.x = Math.floor(this.settings.diagram.position.xRatio * this.settings.containerSettings.width );
		this.settings.diagram.position.y = Math.floor(this.settings.diagram.position.yRatio * this.settings.containerSettings.height);
		
		this.settings.diagram.axis.vertical.legend.top =
			Math.floor(this.settings.containerSettings.height -
				       this.settings.diagram.position.y -
					   (this.settings.diagram.dimentions.height * (isMobile ? (orientation === 'portrait' ? 1.2  : 1.35) : 1.1))); 

		this.settings.diagram.axis.vertical.legend.width  = isMobile ? Math.floor(this.settings.containerSettings.width * 0.3) : Math.floor(this.settings.diagram.position.x * 0.8) ;
        this.settings.diagram.axis.vertical.legend.height = Math.floor(this.settings.diagram.axis.vertical.legend.fontSize * 4.5);

		//start bars
        this.settings.diagram.bars.dimentions.spaceBetweenBars = Math.floor(this.settings.diagram.bars.dimentions.spaceBetweenBarsRatio * this.settings.diagram.dimentions.width);
		this.settings.diagram.bars.dimentions.firstBarAxisOffset = Math.floor(this.settings.diagram.bars.dimentions.firstBarAxisOffsetRatio * this.settings.diagram.dimentions.width);

        this.settings.diagram.bars.model[0].height = Math.floor(this.settings.diagram.bars.dimentions.highestBarRatio * this.settings.diagram.dimentions.height);
        this.settings.diagram.bars.model[0].top    = this.settings.containerSettings.height - this.settings.diagram.position.y - this.settings.diagram.bars.model[0].height;
		this.settings.diagram.bars.model[0].width  = Math.floor(this.settings.diagram.bars.dimentions.widthRatio * this.settings.diagram.dimentions.width);
        this.settings.diagram.bars.model[0].left   =
                                        this.settings.diagram.position.x +
                                        this.settings.diagram.bars.dimentions.firstBarAxisOffset;

        this.settings.diagram.bars.model[1].height = Math.floor(this.settings.diagram.bars.model[0].height * this.settings.diagram.axis.vertical.ticks[1].days/this.settings.diagram.axis.vertical.ticks[0].days );
		this.settings.diagram.bars.model[1].top    = this.settings.containerSettings.height - this.settings.diagram.position.y - this.settings.diagram.bars.model[1].height;
		this.settings.diagram.bars.model[1].width  = this.settings.diagram.bars.model[0].width;
        this.settings.diagram.bars.model[1].left   =
                                        this.settings.diagram.bars.dimentions.spaceBetweenBars +
                                        this.settings.diagram.position.x +
                                        this.settings.diagram.bars.dimentions.firstBarAxisOffset;

        //end bars

        //start vertical ticks
        this.settings.diagram.axis.vertical.ticks[1].left = this.settings.diagram.bars.model[1].left;
        this.settings.diagram.axis.vertical.ticks[1].top  =
                                    Number(this.settings.containerSettings.height -
                                    this.settings.diagram.position.y -
                                    this.settings.diagram.bars.model[1].height -
                                    this.settings.diagram.axis.vertical.ticks[1].fontSize* 1.5) + 'px';

        this.settings.diagram.axis.vertical.ticks[1].width = Number(this.settings.diagram.position.x * 0.85 ) + 'px';

        this.settings.diagram.axis.vertical.ticks[0].left = this.settings.diagram.bars.model[0].left;
        this.settings.diagram.axis.vertical.ticks[0].top =
                                    Number(this.settings.containerSettings.height -
                                    this.settings.diagram.position.y -
                                    this.settings.diagram.bars.model[0].height -
                                    this.settings.diagram.axis.vertical.ticks[0].fontSize*1.5) + 'px';

        this.settings.diagram.axis.vertical.ticks[0].width = Number(this.settings.diagram.position.x * 0.85) + 'px';
        //start vertical ticks

		//bars ticks
		this.settings.diagram.axis.horizontal.ticks.imageDimentions.width  = Math.floor(this.settings.diagram.axis.horizontal.ticks.imageDimentions.widthRatio   * this.settings.diagram.dimentions.width);
        this.settings.diagram.axis.horizontal.ticks.imageDimentions.height = Math.floor(this.settings.diagram.axis.horizontal.ticks.imageDimentions.heightRatio * this.settings.diagram.dimentions.width);
        this.settings.diagram.axis.horizontal.ticks.padding = Math.floor(this.settings.diagram.axis.horizontal.ticks.paddingRatio * this.settings.diagram.dimentions.height);

        this.settings.diagram.axis.horizontal.ticks.images[0].left = Math.floor(this.settings.containerSettings.left + this.settings.diagram.position.x +
		                           this.settings.diagram.bars.dimentions.firstBarAxisOffset -
								  (this.settings.diagram.axis.horizontal.ticks.imageDimentions.width / 2) +
								  (this.settings.diagram.bars.model[0].width /2 ));

		this.settings.diagram.axis.horizontal.ticks.images[1].left = this.settings.diagram.axis.horizontal.ticks.images[0].left + this.settings.diagram.bars.dimentions.spaceBetweenBars;


		this.settings.diagram.axis.horizontal.ticks.images[0].top = Math.floor(this.settings.containerSettings.top + this.settings.containerSettings.height -
			this.settings.diagram.position.y + this.settings.diagram.axis.horizontal.ticks.padding);

		this.settings.diagram.axis.horizontal.ticks.images[1].top = this.settings.diagram.axis.horizontal.ticks.images[0].top;

	}

	$window.addEventListener('resize', function(){
		$scope.$apply(function(){
			calcDimentions.call(this);
		}.bind(this));
	}.bind(this));

	$window.addEventListener('orientationchange', function() {
		$scope.$apply(function(){
			orientation = utils.detectOrientation();
			initializeSettings.call(this, orientation);
			calcDimentions.call(this);
		}.bind(this));
	}.bind(this));

	$interval( function(){

		this.time = new Date();

		var tmp, d = new Date(this.dDay - new Date());

		/*tmp = d.getMilliseconds().toString();
		 this.millis = tmp.length === 3 ? tmp : tmp + '0';*/
		tmp = d.getSeconds().toString();
		this.secs = tmp.length === 2 ? tmp : '0' + tmp;

		tmp = d.getMinutes().toString();
		this.mins = tmp.length === 2 ? tmp : '0' + tmp;

		tmp = d.getHours().toString();
		this.hours = tmp.length === 2 ? tmp : '0' + tmp;

		this.days = Math.floor(d.valueOf()/(1000*60*60*24));


	}.bind(this), 32);
}

	ctrl.$inject = ['$window', '$document', '$scope','$interval', '$sce', 'utils'];
	angular.module('benVsBen').controller('body', ctrl);

})(angular);