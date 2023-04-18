
const EVENTS = [
    { id:1,  url:"/event/wedding.JPG",      type: "wedding",         title: "Wedding",         selected:false,   },
    { id:2,  url:"/event/engagement.JPG",   type: "engagement",      title: "Engagement",      selected:false,   },
    { id:3,  url:"/event/family.JPG",       type: "family",          title: "Family",          selected:false,   },
    { id:4,  url:"/event/party.JPG",        type: "party",           title: "Party",           selected:false,   },
    { id:5,  url:"/event/portrait.JPG",     type: "portrait",        title: "Portrait",        selected:false,   },
    { id:6,  url:"/event/event.JPG",        type: "event",           title: "Events",          selected:false,   },
    { id:7,  url:"/event/maternity.JPG",    type: "maternity",       title: "Maternity",       selected:false,   },
    { id:8,  url:"/event/realestate.JPG",   type: "real_estate",     title: "Real Estate",     selected:false,   },
    { id:9,  url:"/event/graduation.JPG",   type: "graduation",      title: "Graduation",      selected:false,   },
    { id:10, url:"/event/officeteam.JPG",   type: "team_and_office", title: "Team & Office",   selected:false,   },
    { id:11, url:"/event/product.JPG",      type: "product",         title: "Product",         selected:false,   },
    { id:12, url:"/event/modelling.JPG",    type: "modelling",       title: "Modelling",       selected:false,   },
    { id:13, url:"/event/food.JPG",         type: "food",            title: "Food",            selected:false,   },
    { id:14, url:"/event/automotive.JPG",   type: "vehicles",        title: "Vehicles",        selected:false,   },
    { id:15, url:"/event/baby.JPG",         type: "baby",            title: "Baby",            selected:false,   },
    { id:16, url:"/event/kids.JPG",         type: "kids",            title: "Kids",            selected:false,   },
    { id:17, url:"/event/sports.JPG",       type: "sport",           title: "Sports & Games",  selected:false,   },
    { id:18, url:"/event/pets.JPG",         type: "pet",             title: "Pets",            selected:false,   },
    { id:19, url:"/event/religious.JPG",    type: "religious",       title: "Religious",       selected:false,   },
    { id:20, url:"/event/shortfilm.JPG",    type: "short_film",      title: "Short Films",     selected:false,   },
    { id:21, url:"/event/other.JPG",        type: "other",           title: "Other",           selected:false,   },     
]

function ALL_EVENT_TYPES(){
    let all_event_types = []
    EVENTS.forEach(event=>( all_event_types.push(event.type) ))
    return all_event_types
}

export {EVENTS, ALL_EVENT_TYPES}