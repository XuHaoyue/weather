$(function() {
  let weather;
  $.getScript("http://pv.sohu.com/cityjson?ie=utf-8", function() {
    let num = returnCitySN.cname.indexOf("市");
    let city = returnCitySN.cname.slice(0, num);

    $.ajax({
      url: `https://www.toutiao.com/stream/widget/local_weather/data/?city=${city}`,
      dataType: "jsonp",
      success: function(obj) {
        weather = obj.data.weather;
        console.log(weather);
        render();
      }
    });
  });

  function render() {
    //获取城市
    $(".city").html(weather.city_name);
    //当前温度
    $(".tempu").html(weather.current_temperature);
    //天气
    $(".txtweather").html(weather.current_condition);
    //风向
    $(".wind").html(weather.wind_direction);
    //空气指数
    $(".num").html(weather.aqi);
    //空气级别
    $(".zhibiao").html(weather.quality_level);
    //今日天气最低温
    $("#today span:first").html(weather.dat_low_temperature);
    //今日最高温
    $("#today span:last").html(weather.dat_high_temperature);
    //今天天气
    $("#today .weather").html(weather.dat_condition);

    $("#today img").attr({ src: `img/${weather.dat_weather_icon_id}.png` });

    //明天低温
    $("#tomorrow span:first").html(weather.tomorrow_low_temperature);
    //明天高温
    $("#tomorrow span:last").html(weather.tomorrow_high_temperature);
    //明天天气
    $("#tomorrow .weather").html(weather.tomorrow_condition);

    $("#tomorrow img").attr({
      src: `img/${weather.tomorrow_weather_icon_id}.png`
    });

    weather.hourly_forecast.forEach((element, index) => {
      let str = `<li>
            <p class="time">${element.hour}:00</p>
            <img src="img/${element.weather_icon_id}.png" alt="">
            <p class="wendu">${element.temperature}°</p>
        </li>`;
      $(".holdday ul").append(str);
    });

    weather.forecast_list.forEach((element, index) => {
      let num = element.condition.indexOf("转");
      let upstr = "",
        downstr = "";
        let length=element.condition.length
      if (num !== -1) {
        upstr = element.condition.slice(0, num);
        downstr = element.condition.slice(num+1, length);
      } else {
        upstr = element.condition;
        downstr = element.condition;
      }
      let str = `<li>
            <p class="date">${element.date.slice(5, 7)}/${element.date.slice(
        8,
        10
      )}</p>
            <p class="txtmaxwea">${upstr}</p>
            <img src="img/${element.weather_icon_id}.png" alt="">
            <p class="maxwendu">${element.high_temperature}°</p>
            <p class="minwendu">${element.low_temperature}°</p>
            <img src="img/${element.weather_icon_id}.png" alt="">
            <p class="txtminwea">${downstr}</p>
            <p class="windpower">${element.wind_direction}<br>${
        element.wind_level
      }级</p>
        </li>`;
      $(".holdmonth ul").append(str);
    });

    if (`${weather.aqi}` < 50) {
      $(".airapi").css("background", "lightgreen");
    } else if (`${weather.aqi}` < 170) {
      $(".airapi").css("background", "#f0cc35");
    } else {
      $(".airapi").css("background", "red");
    }

    let date=new Date();
    if(date.getTime()>18){
        $("header").css("background","background:url(../img/screen.png) no-repeat center bottom,url(\"../img/screen2.png\") no-repeat center bottom,-webkit-linear-gradient(-90deg,#50ade8,#7ae0fa);")
    }
  }
});
