alert("test");
class Calendar{
	constructor(){
		$('#datePicker').glDatePicker({
			cssName: 'flatwhite',
			showAlways: true,
			borderSize: 0,
			zIndex: 0
		});   
	}
	
	setSelectableDate(year, month, day){
		var cal = $('#datePicker').glDatePicker(true);
		if(cal.options.specialDates == null){
			cal.options.specialDates = [{date: new Date(year, month, day), data: { message: '' }, repeatYear: true, cssClass: 'special'}];
		}else{
			cal.options.specialDates.push({date: new Date(year, month, day), data: { message: '' }, repeatYear: true, cssClass: 'special'});			
		}
//		console.log(cal.options.specialDates);
		cal.render();
	}
	
	freeSelectableDate(year, month, day){
		var cal = $('#datePicker').glDatePicker(true);
		var deleteDate = new Date(year, month, day)
		if(cal.options.specialDates != null){
			for(var i=0; i<cal.options.specialDates.length; i++){
				if(cal.options.specialDates[i].date.getFullYear() == deleteDate.getFullYear()){
					if(cal.options.specialDates[i].date.getMonth() == deleteDate.getMonth()){
						if(cal.options.specialDates[i].date.getDate() == deleteDate.getDate()){
							cal.options.specialDates.splice(i,1);
						}
					}
				}
			}
		}
		cal.render();
	}	
	
	getSelectedDate(){
		var cal = $('#datePicker').glDatePicker(true);
		var date = cal.options.selectedDate;
		return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
		
	}
}

