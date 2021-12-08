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
    this.weekArray = this.getWeekArray(0);
  }

  getWeekArray(weekOffset) {
    const weekArray = [];
    let sundayDate,dayMax,monthCounter,offsetMonth,offsetDay;

    //edit to allow for changing week

    if(this.longMonths.includes(this.todaysDate[1] - 1)){dayMax = 31}
    else if(this.shortMonths.includes(this.todaysDate[1] - 1)){dayMax = 30}
    else if(this.todaysDate[0]%4 == 0){dayMax = 29}
    else{dayMax = 28}

    if(this.day >= this.todaysDate[2]){
      sundayDate = dayMax - (this.day - this.todaysDate[2]);
      monthCounter = this.todaysDate[1] - 1;
      if(monthCounter == 0){monthCounter = 12;}
    }else {
      sundayDate = this.todaysDate[2] - this.day;
      monthCounter = this.todaysDate[1];
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
