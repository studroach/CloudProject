class DateManager{
  constructor(){
    this.date = new Date();
    this.todaysDate = [
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      this.date.getDate()
    ];
    this.day = this.date.getDay()
    this.longMonths = [0,1,3,5,7,8,10,12];
    this.shortMonths = [4,6,9,11];
    this.offsetDay = this.todaysDate[2];
    this.offsetMonth = this.todaysDate[1];
    this.offsetWeek = 0;
    this.weekArray = this.getWeekArray(0);
  }

  getWeekArray(weekOffset) {
    const weekArray = [];
    let sundayDate,dayMax,monthCounter;
    console.log(weekOffset);
    //change offsetDay and offsetMonth
    if(weekOffset != this.offsetWeek){
      this.offsetWeek = weekOffset;

      if(weekOffset > 0) {
        if(this.longMonths.includes(this.offsetMonth)){dayMax = 31}
        else if(this.shortMonths.includes(this.offsetMonth)){dayMax = 30}
        else if(this.todaysDate[0]%4 == 0){dayMax = 29}
        else{dayMax = 28}
        if(this.offsetDay + 7 > dayMax){
          this.offsetDay = (this.offsetDay + 7) - dayMax;
          this.offsetMonth++;
        }else {
          this.offsetDay = this.offsetDay + 7;
        }
      }else {
        if(this.offsetDay - 7 < 0) {
          if(this.longMonths.includes(this.offsetMonth - 1)){dayMax = 31}
          else if(this.shortMonths.includes(this.offsetMonth - 1)){dayMax = 30}
          else if(this.todaysDate[0]%4 == 0){dayMax = 29}
          else{dayMax = 28}
          this.offsetDay = dayMax - (this.offsetDay - 7);
          this.offsetMonth--;
        }else {
          this.offsetDay = this.offsetDay - 7;
        }
      }
    }

    //create the array of dates for the week shown
    if(this.longMonths.includes(this.offsetMonth - 1)){dayMax = 31}
    else if(this.shortMonths.includes(this.offsetMonth - 1)){dayMax = 30}
    else if(this.todaysDate[0]%4 == 0){dayMax = 29}
    else{dayMax = 28}

    if(this.day >= this.offsetDay){
      sundayDate = dayMax - (this.day - this.offsetDay);
      monthCounter = this.offsetMonth - 1;
      if(monthCounter == 0){monthCounter = 12;}
    }else {
      sundayDate = this.offsetDay - this.day;
      monthCounter = this.offsetMonth;
    }

    for(var i = 0; i < 7; i++) {
      weekArray.push(`${sundayDate + i}/${monthCounter}`);
      if(sundayDate + i == dayMax){
        sundayDate = 0 - i;
        monthCounter++;
        if(monthCounter == 13){monthCounter = 1;}
      }
    }

    return weekArray;
  }
}
