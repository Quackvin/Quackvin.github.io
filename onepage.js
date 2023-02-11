// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
}
  
$(document).ready(function(){
    // smooth nav
    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            event.preventDefault(); // Prevent default anchor click behavior
            var hash = this.hash; // Store hash
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash; // Add hash (#) to URL when done scrolling (default click behavior)
            });
        } // End if
    });

    set_roster()
});

let host_roster = ['T','H','C']
let chef_roster = ['K','C','T','H']

function set_roster(){
    let date = next_monday_delta(-14);
    set_roster_cell($("#ros_box_1"), date, get_host_index(date), get_chef_index(date));
    date = next_monday_delta(-7);
    set_roster_cell($("#ros_box_2"), date, get_host_index(date), get_chef_index(date));
    date = get_next_monday();
    set_roster_cell($("#ros_box_3"), date, get_host_index(date), get_chef_index(date));
    date = next_monday_delta(7)
    set_roster_cell($("#ros_box_4"), date, get_host_index(date), get_chef_index(date));
    date = next_monday_delta(14);
    set_roster_cell($("#ros_box_5"), date, get_host_index(date), get_chef_index(date));
}

function get_host_index(date){
    return host_roster[date.getWeek() % 3]
}

function get_chef_index(date){
    if(chef_roster[date.getWeek() % 4] == 'K')
        return 'K'
    return get_host_index(date)
}

function set_roster_cell(element, date, host, chef){
    element.children('p')[0].textContent = date_to_str(date);
    element.children('h3')[0].textContent = host;
    element.children('h3')[1].textContent = chef;
}

function date_to_str(date){
    let month_names = ['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemnber'];
    return `${date.getDate()} ${month_names[date.getMonth()]}`
}

function get_next_monday(){
    let today = new Date();
    let days_since_monday = today.getDay() - 1    
    let days_to_monday = 7-days_since_monday
    let next_monday = new Date(today.setDate(today.getDate() + days_to_monday));
    return next_monday
}

function next_monday_delta(delta){
    let next_monday = get_next_monday()
    return new Date(next_monday.setDate(next_monday.getDate() + delta))
}
