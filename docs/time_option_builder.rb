require 'time'

0.upto(23){ |h| 
  (0..55).step(5){ |m| 
    time = "#{h}:#{"%02d"%m}"
    h12 = Time.parse(time).strftime("%l:%M %p").strip
    puts %Q/{ value: "#{time}", text:  "#{h}:#{"%02d"%m} (#{h12})"},/
  }
}
