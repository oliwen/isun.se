(function () {

	var lastSentData = null;

	var clickOnType = function (me) {
		$("#statsYears").hide();
		$("#statsSeasons").show();

		if (me.hasClass("active")) {
			me.removeClass("active");
		}
		else {
			me.addClass("active");
			$("#navbar_type a.main").removeClass("active");
		}

		var selectedSeasons = {};
		$("#navbar_type a.item.active").each(function () {
			selectedSeasons[$(this).attr("data")] = 1;
		});
		$("#statsSeasons a.item").each(function () {
			var item = $(this);
			item.show();

			if (selectedSeasons[item.attr("type")] != 1) {
				item.removeClass("active");
				item.removeClass("use-data");
				item.hide();
			}
		});

		if ($("#navbar_type a.item.active").length == 0) {
			$("#navbar_type a.main").addClass("active");
			$("#statsSeasons").hide();
			$("#statsYears").show();
			$("#statsYears a.main").addClass("active");
			$("#statsYears a.item").removeClass("active");
			$("#statsYears a.item").removeClass("use-data");
			$("#statsYears a.item").addClass("use-data");
		}

		if ($("#statsSeasons a.item.active").length == 0) {
			//alert($("#statsSeasons a.item.active").length);
			$("#statsSeasons a.main").addClass("active");
			$("#statsSeasons a.item").addClass("use-data");

			$("#statsSeasons a.item").each(function () {
				if( $(this).css("display") == "none") {
					$(this).removeClass("use-data");
				}
			});
			
		}

		/*************************************
		Hide dropdown-header for years with hidden seasons. 
		*************************************/
		var seasonYearPrevious = "";
		//Initial show all li's
		$('#statsSeasons li[data-year]').show();
		
		//For each season link check data-year and hide dropdown-header if there is no visible links with the same year. 
		$('#statsSeasons a[data-year]').each(function() {
			seasonYear = $(this).data('year');
			if( seasonYearPrevious != seasonYear) {
				
				elem = $('#statsSeasons a[data-year="'+seasonYear+'"]');
				hiddenLinks = elem.filter(function() { return $(this).css('display') == 'none'; }).length;
				visibleLinks = elem.length;

				//Check if all season links are hidden
				if( hiddenLinks == visibleLinks ) {
					$('#statsSeasons [data-year="'+seasonYear+'"]').hide();
				}

				seasonYearPrevious = seasonYear;
			};

		});



	}

	$("#navbar_type a.item").click(function (e) {
	    e.preventDefault();
	    e.stopPropagation();

		var me = $(this);
		clickOnType(me);

		postData();
	});

	$("#navbar_type a.main").click(function (e) {
		e.preventDefault();

		$("#statsYears").show();
		$("#statsSeasons").hide();

		var me = $(this);

		if (me.hasClass("active")) {
			return;
		}

		$("#navbar_type a.item").removeClass("active");
		me.addClass("active");

		postData();
	});

	$("#statsYears a.main").click(function (e) {
		e.preventDefault();

		var me = $(this);
		if (me.hasClass("active")) {
			return;
		}
		$("#statsYears a.item").removeClass("active");
		$("#statsYears a.item").removeClass("use-data");
		$("#statsYears a.item").addClass("use-data");
		me.addClass("active");

		postData();
	});
	$("#statsYears a.item").click(function (e) {
		e.preventDefault();

		$("#statsYears a.item").removeClass("use-data");

		var me = $(this);
		if (me.hasClass("active")) {
			me.removeClass("active");

			if ($("#statsYears a.item.active").length === 0) {
				$("#statsYears a.main").addClass("active");
				$("#statsYears a.item").addClass("use-data");
				postData();
				return;
			}
		}
		else {
			me.addClass("active");
			$("#statsYears a.main").removeClass("active");
		}
		$("#statsYears a.item.active").addClass("use-data");

		postData();
	});

	$("#statsSeasons a.main").click(function (e) {
		e.preventDefault();

		var me = $(this);
		if (me.hasClass("active")) {
			return;
		}
		$("#statsSeasons a.item").removeClass("active").removeClass("use-data");
		$("#statsSeasons a.item:visible").addClass("use-data");
		me.addClass("active");

		postData();
	});

	$("#statsSeasons a.item").click(function (e) {
		e.preventDefault();

		$("#statsSeasons a.item").removeClass("use-data");

		var me = $(this);
		if (me.hasClass("active")) {
			$(this).removeClass("active");

			if ($("#statsSeasons a.item.active").length === 0) {
				$("#statsSeasons a.main").addClass("active");
				$("#statsSeasons a.item").addClass("use-data");
				//return;
			}
		}
		else {
			me.addClass("active");
			$("#statsSeasons a.main").removeClass("active");
		}
		$("#statsSeasons a.item.active").addClass("use-data");

		postData();
	});

	var postData = function () {
		var data = "";
		var seasons = "";
		var years = "";

		if (lastSentData == null) {

			$("#statsYears a.item:first").addClass("active");
			$("#statsYears a.item:first").addClass("use-data");

			// Load data from hash tag
			var hashData = document.location.hash.toString();
			if (hashData.charAt(1) == "y") {
				var yearsArray = hashData.substring(3).split(",");

				if (yearsArray.length > 0 && yearsArray[0] != "") {
					$("#statsYears a.main").removeClass("active");
					$("#statsYears a.item").removeClass("use-data");

					//alert(yearsArray);
					$("#statsYears a.item").each(function () {
						if ($.inArray($(this).attr("data"), yearsArray) >= 0) {
							$(this).addClass("active");
							$(this).addClass("use-data");
						}
					});
				}
				else {
					$("#statsYears a.main").addClass("active");
					$("#statsYears a.item").removeClass("active").removeClass("use-data").addClass("use-data");
				}
			}
			else if (hashData.charAt(1) == "s") {
				var data = document.location.hash.substring(1);
				var split = data.split("&");
				var s = split[0].substring(2);
				var t = split[1].substring(2);

				var typesArray = t.split(",");
				if (typesArray.length > 0) {

					$("#navbar_type a.item").each(function () {
						if ($.inArray($(this).attr("data"), typesArray) >= 0) {
							var me = $(this);
							clickOnType(me);
						}
					});
				}

				var seasonsArray = s.split(",");
				if (seasonsArray.length > 0 && seasonsArray[0].length > 0) {

					$("#statsSeasons a.main").removeClass("active");
					$("#statsSeasons a.item").removeClass("use-data");
					$("#statsSeasons a.item").each(function () {
						if ($.inArray($(this).attr("data"), seasonsArray) >= 0) {
							var me = $(this);
							me.addClass("active");
							me.addClass("use-data");
						}
					});
				}
			}
		}

		//alert($("#statsSeasons:hidden").length);
		//if ($("#statsSeasons:hidden").length == 0) {
		//$("#statsSeasons").show();
		//alert($("#statsSeasons").css("display"));
		if ($("#statsSeasons").css("display") != "none") {

			var hashTag = "";
			var types = "";
			$("#navbar_type a.item.active").each(function () {
				if (types.length > 0) {
					types += ",";
				}
				types += $(this).attr("data");
			});

			$("#statsSeasons a.item.use-data").each(function () {
				if (seasons.length > 0) {
					seasons += ",";
				}
				seasons += $(this).attr("data");
			});
			data = seasons;
			if ($("#statsSeasons a.main").hasClass("active")) {
				hashTag = "s=";
			}
			else {
				hashTag = "s=" + data;
			}
			document.location.hash = hashTag + "&t=" + types;
		}
		else {
			$("#statsYears a.item.use-data").each(function () {
				if (years.length > 0) {
					years += ",";
				}
				years += $(this).attr("data");
			});
			data = years;

			if ($("#statsYears a.main").hasClass("active")) {
				window.location.hash = "y=";
			}
			else {
				window.location.hash = "y=" + data;
			}
		}

		if (data != lastSentData) {
			setFbUrl();
			setTwitterUrl();

			loadStats(seasons, years);
			lastSentData = data;
		}
	}

	function setHashUrl()
	{
		window.location.hash = "s=" + getActiveSeasons() + "&y=" + getActiveSeasonYears() + "&t=" + getActiveSeasonsGroup();
	}

	var statsRequest = null;
	var loadStats = function (seasons, years) {
		$('.failed').hide();
		$('.loader').show();

		$("#playersTable tbody").empty();
		$("#goalies tbody").empty();

		if (statsRequest != null) {
			statsRequest.abort();
		}
		setHashUrl();
		statsRequest = $.ajax({
			type: 'POST',
			url: '/' + teamName + '/statistik/playerstats',
			data: ({ seasons: seasons, years: years }),
			success: playersLoaded,
			error: dataError
		});

	}

	var dataError = function (jqXHR, textStatus, errorThrown) {
		//$('.failed').show();
		//$('.loader').hide();
	}

	var playersLoaded = function (response, status, xhr) {
		statsRequest = null;
		$("#players .loader").hide();
		$("#players .failed").hide();
		$("#goalies .loader").hide();
		$("#goalies .failed").hide();
		if (status == "error") {
			$("#players .failed").show();
			$("#goalies .failed").show();
		}
		else {
			var $response = $(response);
			var playerData = $("#playerRows tbody", $response);
			var goalieData = $("#goalieRows tbody", $response);

			$("#playersTable tbody").empty();
			$("#playersTable tbody").append(playerData.html());

			$("#goaliesTable tbody").empty();
			$("#goaliesTable tbody").append(goalieData.html());

			// Let the plugin know that we made a update 
			$("#playersTable").trigger("update");
			$("#goaliesTable").trigger("update");
			// Sort new data, this must be triggered after update
			setTimeout(sortPlayers, 1);
			setTimeout(sortGoalies, 1);

			//set button text 
			setFilterButtonTitle()
		}
	}

	var sortPlayers = function () {
		//$("#playersTable").trigger("updateSort");

		var sorting = [[playerSortOnFirst, 1], [playerSortOnSecond, 1], [playerSortOnThird, 1]];
		//var sorting = [[0, 0], [1, 1], [playerSortOnThird, 1]];

		// note: the square brackets around sorting are required!
		$("#playersTable").trigger("sorton", [sorting]);
	}
	var sortGoalies = function () {
		$("#goaliesTable").trigger("updateSort");
	}

	var setFbUrl = function () {
		$("#fbLink").attr("href", "http://www.facebook.com/sharer.php?u=" + escape(window.location));
	}

	var setTwitterUrl = function () {
		$("#twitterLink").attr("href", "https://twitter.com/share?url=" + escape(window.location));
	}

	var onPlayersSorted = function () {
		//$("#playersTable tbody tr").removeClass("rowBg1").not(":last-child").addClass("rowBg1");
	}
	var onGoaliesSorted = function () {
		//$("#goaliesTable tbody tr").removeClass("rowBg1").not(":last-child").addClass("rowBg1");
	}

	setFbUrl();
	setTwitterUrl();

	//var playerPointsColumn = $("#playersTable tr th").length - 1;
	var playerSortOnFirst = $("#playersTable th.sort1").index();
	var playerSortOnSecond = $("#playersTable th.sort2").index();
	var playerSortOnThird = $("#playersTable th.sort3").index();

	//alert("sort on : " + playerSortOnFirst + " / "  + playerSortOnSecond + " / " + playerSortOnThird);
	if (playerSortOnSecond == -1) {
		playerSortOnSecond = playerSortOnFirst;
	}
	if (playerSortOnThird == -1) {
		playerSortOnThird = playerSortOnSecond;
	}

	var goaliePointsColumn = $("#goaliesTable tr th").length - 1;
	var goalieSortOnFirst = $("#goaliesTable th.sort1").index();
	$.tablesorter.addParser({
		id: 'sortIndexName',
		is: function (s) {
			return false;
		},
		format: function (s, table, cell, cellIndex) {
			// format your data for normalization 
			return $(cell).data('sort-index');
		},
		type: 'numeric'
	}); 

	$("#playersTable").tablesorter({
		headers: {
			0: {
				sortInitialOrder: 'asc',
				sorter: 'sortIndexName'
			},
		},
		sortInitialOrder: "desc",
		sortRestart: true,
		onSorted: onPlayersSorted,
		sortList: [[playerSortOnFirst, 1], [playerSortOnSecond, 1], [playerSortOnThird, 1]],
		sortForceAppendAsc: [[playerSortOnFirst, 1], [playerSortOnSecond, 1], [playerSortOnThird, 1]],
		sortForceAppendDesc: [[playerSortOnFirst, 0], [playerSortOnSecond, 0], [playerSortOnThird, 0]]
  });
	$("#goaliesTable").tablesorter({
		headers: {
			0: {
				sortInitialOrder: 'asc',
				sorter: 'sortIndexName'

			},
		},
		sortInitialOrder: "desc",
		onSorted: onGoaliesSorted,
		sortList: [[goalieSortOnFirst, 1], [goaliePointsColumn, 1]],
		sortForceAppendAsc: [[goalieSortOnFirst, 1], [goaliePointsColumn, 1]],
		sortForceAppendDesc: [[goalieSortOnFirst, 0], [goaliePointsColumn, 0]]
	});


	// *** NEW FILTER ***

	function getActiveSeasonYears()
	{
		var activeSeasonYears = null;
		if ($(".filter-year a.all.active").length > 0)
			activeSeasonYears = $(".filter-year a:not(.all)");
		else
			activeSeasonYears = $(".filter-year a.active");
		var activeSeasonYearsString = activeSeasonYears.map(function (i, x) { return $(x).data("year") + "-01-01"; }).toArray().join();
		return activeSeasonYearsString;
	}

	function getActiveSeasons()
	{
		var activeSerieTypeIds = $('a.main.toggle-subfilter.active').map(function (i, x) { return $(x).data('serietypeid') }).toArray();
		var activeSeasonIds = [];
		activeSerieTypeIds.forEach(function (activeSerieTypeId) {
			var seasonIds = $('.sub-filter .item[data-serietypeid="' + activeSerieTypeId + '"][data-visible="true"]').map(function (i, x) { return $(x).data('serieid') }).toArray();
			activeSeasonIds = activeSeasonIds.concat(seasonIds);
		});
		var seasonIds = $('.sub-filter .item.active[data-visible=true]').map(function (i, x) { return $(x).data('serieid') }).toArray();
		activeSeasonIds = activeSeasonIds.concat(seasonIds);
		return activeSeasonIds.join();
	}

	function getActiveSeasonsGroup()
	{
		return $('.toggle-subfilter.active').map(function (i, x) { return $(x).data('serietypeid') }).toArray().join();
	}

	/* UI: Toggle filter visibility  */
	$(".filter-list a").on("click", function (e) {
		e.preventDefault();
	});

	$(".toggle-filter-list").on("click", function () {
		$(".filter-list").toggle();
		if ($(".filter-list:visible").length == 0)
			loadStats(getActiveSeasons(), getActiveSeasonYears());
	});

	function resolveFilterAllSeries()
	{
		if (!getActiveSeasons())
			$('.filter-series .all').addClass('active');
		else
			$('.filter-series .all').removeClass('active');
	}
	resolveFilterAllSeries();

	function deactivateSeries(serieTypeId)
	{
		$('.filter-series .item[data-serietypeid="' + serieTypeId + '"]').removeClass('active');
	}

	function checkSubfilter(el)
	{
		$(el).toggleClass('active');
		deactivateSeries($(el).data('serietypeid'))
		resolveFilterAllSeries();
	}

	$(".toggle-subfilter").on("click", function (ev) {
		if (ev.offsetX < 25 && ev.target == this)
		{
			checkSubfilter(this);
			return;
		}
		$(this).toggleClass("open");
		$(this).next(".sub-filter").toggle();
	});

	function hideLastSeparator()
	{
		$(".sub-filter").toArray().forEach(function (item) {
			var separators = $(item).children(".separator[data-visible='true']");
			$(separators[separators.length - 1]).data('visible', 'true').hide();
		});
	}


	function filterSeriesByYear(years) {
		var allYears = $('.filter-year .item').map(function (i, x) { return $(x).data('year') }).toArray();
		var yearsActive = [];
		if (years == 'all') {
			$('.filter-year .item').each(function () {
				yearsActive.push($(this).data("year"));
			});
		} else {
			$('.filter-year .item.active').each(function () {
				yearsActive.push($(this).data("year"));
			});
			var inactiveYears = allYears.filter(function (year) { return yearsActive.indexOf(year) == -1 });
			inactiveYears.forEach(function (year) {
				$('.filter-series .item.active[data-year="'+ year +'"]').click();
			});
		}

		$(".filter-series .item, .separator").removeAttr("data-visible").hide();

		for (var i = 0; i < yearsActive.length; i++) {
			seriesInYear = $('.filter-series .item[data-year="' + yearsActive[i] + '"]').length;
			var seriesAndSeparators = $(".filter-series .item, .separator").filter('[data-year="' + yearsActive[i] + '"]');
			$(seriesAndSeparators).attr("data-visible", "true").show();
		}
		hideLastSeparator();
		countSeriesInType();
	}

	filterSeriesByYear();

	//Count no. series in a SerieType based on selected year(s)
	function countSeriesInType() {
		$(".filter-series .main").each(function () {
			badge = $(this).find(".badge");
			serieCount = $(this).next(".sub-filter").find('a[data-visible=true]').length;
			badge.text(serieCount);

			if (serieCount == 0) {
				$(this).addClass("disabled");
				$(this).removeClass("active");
				$(this).next('.sub-filter').hide();
			} else {
				$(this).removeClass("disabled");
			}
		});
	}

	$('.sub-filter a.item').click(function (ev) {
		$(this).toggleClass('active');
		var serieTypeId = $(this).data('serietypeid');
		$('.toggle-subfilter[data-serietypeid="' + serieTypeId + '"]').removeClass('active');
		resolveFilterAllSeries();
	});

	//Toggle checkbox for active years
	$(".filter-year a").on("click", function () {
		year = $(this).data("year");

		if ($(this).is(".all")) {
			$(".filter-year .item").removeClass("active");
			$(this).toggleClass("active");
		} else {
			$(".filter-year .all").removeClass("active");
			$(this).toggleClass("active");
		}
		$('.filter-series .item.active[data-year="' + year + '"]').click();

		//select "Alla år" if no other option is selected
		if ($(".filter-year a.item.active").length == 0) {
			$(".filter-year a.all").addClass('active');
			filterSeriesByYear('all');
		}
		else {
		filterSeriesByYear(year);
		}




	});

	$('.filter-series .all').click(function () {
		if ($(this).hasClass('active'))
			return;
		$(this).addClass('active');

		$('.sub-filter .item, .toggle-subfilter').removeClass('active');
	});

	$(document).click(function () {
		if ($('.filter-list:visible').length > 0)
		{
			$('.filter-list:visible').hide();
			loadStats(getActiveSeasons(), getActiveSeasonYears());
		}
	});
	$('.filter-list, .toggle-filter-list').click(function (ev) {
		ev.stopPropagation();
	});

	function loadHashUrl()
	{
		var hashData = document.location.hash.toString();
		if (!hashData)
		{
			$('.filter-year [data-year="' + statsStartYear + '"]').click();
			return;
		}
		var hashGroup = hashData.replace('#', '').split('&');
		var years = hashGroup[1].substring(2).split(",");
		if (years.length == $('.filter-year .item').length) {
			$('.filter-year .all').click();
		}
		else {
			years.forEach(function (year) {
				$('.filter-year [data-year="' + year.substring(0, 4) + '"]').click();
			});
		}

		var seasonsArray = hashGroup[0].substring(2).split(',');

		seasonsArray.forEach(function (season) {
			$('.sub-filter [data-serieid="' + season + '"]').click();
		})

		var seasonsGroupArray = hashGroup[2].substring(2).split(',');
		seasonsGroupArray.forEach(function (seasonGroup) {
			checkSubfilter($('.toggle-subfilter[data-serietypeid="' + seasonGroup + '"]'));
		});
	}
	loadHashUrl();
	loadStats(getActiveSeasons(), getActiveSeasonYears())
	//postData();




	/*
	Set button text
	*/

    function setFilterButtonTitle() {
        var seasonText = "";
        var serieTypeText = "";
        var serieText = "";

        
        var chkSeasonsAll = $('.filter-year a.all');
        var chkSeasonsItem = $('.filter-year a.item.active');

        var chkSerieAll = $('.filter-series a.all');
        var chkSerieMain = $('.filter-series a.main.active');
        var chkSerieItem = $('.filter-series a.item.active');

        // Seasons text
        if( chkSeasonsAll.is(".active") ) {
            seasonText = "Alla år, ";
        } else if( chkSeasonsItem.length > 1 ) {
            seasonText = chkSeasonsItem.length + " år, ";
        } else if( chkSeasonsItem.length == 1 ) {
            seasonText = chkSeasonsItem.data("name") + ", ";
        }

        // SerieType text
        if( chkSerieAll.is(".active") ) {
            serieTypeText = "Alla serier";//All
        }
        else if( chkSerieMain.length > 1 ) {
            serieTypeText = chkSerieMain.length + " typer av serier";//More than one Serie Type 
        }
        else if( $('.filter-series a.main.active').length == 1 ) {
            serieTypeText = $('.filter-series a.main.active').contents().filter(function(){ return this.nodeType === 3; }).text();//One serie type (all series in a type)
        }

        // Serie text
        if( chkSerieItem.length == 1 ) {
            serieText = chkSerieItem.contents().filter(function(){ return this.nodeType === 3; }).text();//One serie
        }
        else if( chkSerieItem.length > 1 ) {
            serieText = chkSerieItem.length + " serier";//More than one serie
        }


        //Both "all" and individual series are choosen
        if( chkSerieMain.length >= 1 && chkSerieItem.length == 1) {
            serieText = "& "+ chkSerieItem.length + " annan serie";
        } else if( chkSerieMain.length >= 1 && chkSerieItem.length > 1) {
            serieText = "& "+ chkSerieItem.length + " andra serier";
        }


        buttonTitle = seasonText +" "+ serieTypeText +" "+ serieText;

        
        $(".toggle-filter-title").text(buttonTitle)
    }
    //setFilterButtonTitle()



})();

