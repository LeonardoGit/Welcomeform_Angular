/************************************
  This is the basic json where the forms structures are based on.
************************************/

export default {
    "customer_id": 1,
    "crm_city": {
        "id": "input_crm_city",
        "name": "properties[crm_city]",
        "value": "Athens"
    },
    "crm_distributor": {
        "id": "input_crm_distributor",
        "name": "properties[crm_distributor]",
        "value": ""
    },
    "crm_distributor_type": {
        "id": "input_crm_distributor_type",
        "name": "properties[crm_distributor_type]",
        "value": ""
    },
    "crm_distributor_comission": {
        "value": 0
    },
    "crm_vehicle_type": {
        "id": "input_crm_vehicle_type",
        "name": "properties[crm_vehicle_type]",
        "value": "Taxi"
    },
    "form": {
      "layout": 'wpf-city-v2',
      "theme": 'wpf-city-v2',
        "return_to": {
            "value": "pages/athens-welcome-beyond-the-essentials",
            "name": "return_to"
        },
        "form_action": "//www.welcomepickups.com/cart/add",
        "fields": {
            "form_title": {
                "id": "form_title",
                "value": "Book your Welcome Transfer"
            }
        },
        
        
        "first_way": {
            "date": {
            "id": "first_way_date",
            "name": "properties[first_way_date]",
            "label": "DATE",
            "placeholder": "20 Aug. 2015",
            "tooltip": "",
            "value": ""
        },
        "time": {
            "id": "first_way_time",
            "name": "properties[first_way_time]",
            "label": "TIME",
            "placeholder": "",
            "tooltip": "Please put the exact time and we will calculate automatically the time to pick you up.",
            "value": ""
        },
        "flight_number": {
            "id": "first_way_flight_number",
            "name": "properties[first_way_flight_number]",
            "label": "FLIGHT NO.",
            "placeholder": "LH735",
            "tooltip": "We need the flight number to watch for delays and cancelations. It is a 5 digit code like the one below.",
            "value": ""
        },
        "ferry_number": {
            "id": "first_way_flight_number",
            "name": "properties[first_way_ferry_number]",
            "label": "FERRY NO.",
            "placeholder": "Seajet1",
            "tooltip": "We need the ferry details to watch for delays and cancelations. ",
            "value": ""
        },
        "passengers": {
            "id": "first_way_passengers",
            "name": "properties[first_way_passengers]",
            "label": "NUMBER OF PASSENGERS",
            "placeholder": "Number of passengers",
            "tooltip": "Total Number of people including toddlers etc. The price is calculated per required vehicle, not per person.",
            "value": 1
        },
        "luggage": {
            "id": "first_way_luggage",
            "name": "properties[first_way_luggage]",
            "label": "NUMBER OF Luggage",
            "placeholder": "Number of Luggage",
            "tooltip": "Add the number of suitcases, not carry-ons.",
            "value": 1
        },
        "from_name": {
            "id": "first_way_from_name",
            "name": "properties[first_way_from_name]",
            "label": "From",
            "placeholder": "Start typing...",
            "value": ""
        },
        "from_latlng": {
            "id": "first_way_from_latlng",
            "name": "properties[first_way_from_latlng]",
            "value": ""
        },
        "from_location_id": {
            "id": "from_location_id",
            "name": "properties[first_way_from_location_id]",
            "value": ""
        },
        "to_name": {
            "id": "first_way_to_name",
            "name": "properties[first_way_to_name]",
            "label": "To",
            "placeholder": "Start typing...",
            "value": ""
        },
        "to_latlng": {
            "id": "first_way_to_latlng",
            "name": "properties[first_way_to_latlng]",
            "value": ""
        },
        "to_location_id": {
            "id": "first_way_to_location_id",
            "name": "properties[first_way_to_location_id]",
            "value": ""
        },
        "driver_cost": {
            "id": "first_way_driver_cost",
            "name": "properties[first_way_driver_cost]",
            "value": ""
        },
        "traveler_cost": {
            "id": "first_way_traveler_cost",
            "name": "properties[first_way_traveler_cost]",
            "value": ""
        }

        },
        "second_way": {
            "date": {
                "id": "second_way_date",
                "name": "properties[second_way_date]",
                "label": "DATE",
                "placeholder": "20 Aug. 2015",
                "tooltip": "",
                "value": ""
            },
            "time": {
                "id": "second_way_time",
                "name": "properties[second_way_time]",
                "label": "TIME",
                "placeholder": "",
                "tooltip": "Please put the exact time and we will calculate automatically the time to pick you up.",
                "value": ""
            },
            "flight_number": {
                "id": "second_way_flight_number",
                "name": "properties[second_way__flight_number]",
                "label": "FLIGHT NO.",
                "placeholder": "LH735",
                "tooltip": "We need the flight number to watch for delays and cancelations. It is a 5 digit code like the one below.",
                "value": ""
            },
            "ferry_number": {
                "id": "second_way_flight_number",
                "name": "properties[second_way_flight_number]",
                "label": "FERRY NO.",
                "placeholder": "Seajet2",
                "tooltip": "We need the ferry details to watch for delays and cancelations. ",
                "value": ""
            },
            "passengers": {
                "id": "second_way_passengers",
                "name": "properties[second_way_passengers]",
                "label": "Number OF PASSENGERS",
                "placeholder": "Number of passengers",
                "tooltip": "Total Number of people including toddlers etc. The price is calculated per required vehicle, not per person.",
                "value": 1
            },
            "luggage": {
                "id": "second_way_luggage",
                "name": "properties[first_way_luggage]",
                "label": "NUMBER OF LUGGAGE",
                "placeholder": "Number of Luggage",
                "tooltip": "Add the number of suitcases, not carry-ons.",
                "value": 1
            },
            "from_name": {
                "id": "second_way_from_name",
                "name": "properties[second_way_from_name]",
                "label": "From",
                "placeholder": "Start typing...",
                "value": ""
            },
            "from_latlng": {
                "id": "second_way_from_latlng",
                "name": "properties[second_way_from_latlng]",
                "value": ""
            },
            "from_location_id": {
                "id": "second_way_location_id",
                "name": "properties[second_way_from_location_id]",
                "value": ""
            },
            "to_name": {
                "id": "second_way_to_name",
                "name": "properties[second_way_to_name]",
                "label": "TO",
                "placeholder": "Start typing...",
                "value": ""
            },
            "to_latlng": {
                "id": "first_way_from_name",
                "name": "properties[second_way_to_latlng]",
                "value": ""
            },
            "to_location_id": {
                "id": "second_way_to_location_id",
                "name": "properties[second_way_to_location_id]",
                "value": ""
            },
            "driver_cost": {
                "id": "second_way_driver_cost",
                "name": "properties[second_way_driver_cost]",
                "value": ""
            },
            "traveler_cost": {
                "id": "second_way_traveler_cost",
                "name": "properties[second_way_traveler_cost]",
                "value": ""
            }

        },
        "email": {
            "id": "email",
            "name": "properties[email]",
            "label": "Contact Email",
            "placeholder": "myname@mail.com",
            "value": ""
        },
        "traveler_phone": {
            "id": "traveler_phone",
            "name": "properties[traveler_phone]",
            "label": "Traveler Phone",
            "value": ""
        },
        "full_name": {
            "id": "full_name",
            "name": "properties[full_name]",
            "label": "FULL NAME",
            "placeholder": "Alex Gray",
            "value": ""
        },
        "traveler_comment": {
            "id": "traveler_comment",
            "name": "properties[traveler_comment]",
            "label": "NOTES",
            "placeholder": "Any additional notes you want us to know.",
            "value": ""
        },
        "coupon_field": {
            "id": "coupon_field",
            "name": "properties[coupon]",
            "label": "I have a coupon",
            "placeholder": "Couponcode",
            "value": ""
        },
        "coupon_cost": {
            "id": "coupon_cost",
            "name": "properties[coupon_cost]"
        },
        "total_traveler_cost": {
            "id": "total_traveler_cost",
            "name": "properties[total_traveler_cost]"
        }
    },

    "coupons": [
        {
            "fixed_discount": false,
            "code": "myWelcome",
            "value": 15
        },
        {
            "fixed_discount": false,
            "code": "iamsolucky",
            "value": 100
        },  
        {
            "fixed_discount": false,
            "code": "CER free",
            "value": 100
        },                
        {
            "fixed_discount": false,
            "code": "ACVB1",
            "value": 100
        },   
        {
            "fixed_discount": false,
            "code": "ACVB2",
            "value": 100
        },   
        {
            "fixed_discount": true,
            "code": "HappyWelcome",
            "value": 5
        },
        {
            "fixed_discount": true,
            "code": "CER coupon",
            "value": 5
        }        

    ],

    "price_timespans": {
      "night": {
        "label": "nightprice",
        "start": "0:00",
        "end": "4:59"
      },
      "day": {
        "label": "dayprice",
        "start": "5:00",
        "end": "23:59"
      },
      "offsets":{
        "airport": {
          "arrival": -75,
          "departure": 150
        },
        "port": {
          "arrival": -60,
          "departure": 60
        }
      }
    },
    "default_rates": {
      "drivers_cost_day": 33,
      "drivers_cost_night": 49,
      "travelers_cost_day": 38,
      "travelers_cost_night": 54
    },
    "distance_fares": {
      "day": {
           "kilometer_price": 0.68,
        "fixed_price": 3.00
             },
             "night": {
                 "kilometer_price": 1.19,
                 "fixed_price": 5.00
               }
             }
};
