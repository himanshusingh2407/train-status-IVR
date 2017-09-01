module.exports = {
  getDate: function(day) {
    var m_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    // day = 1 for today (default)
    var d = new Date();
    
    // day = 0 for yesterday
    if (day == 0) {
      d = new Date(new Date().getTime() - 24 * 60 * 60 * 1000// day = 2 for tomorrow
      );
    } else if (day == 2) {
      d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    }
    console.log(d.getDate() + ' ' + m_names[d.getMonth()]);
    return (d.getDate() + ' ' + m_names[d.getMonth()]);
  }
};
