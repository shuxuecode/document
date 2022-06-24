#!/bin/sh


echo "123"


LIST[1]="H"
LIST[2]="e"
LIST[3]="l"
LIST[4]="l"
LIST[5]="o"

echo $LIST[1] $LIST[2] $LIST[3] $LIST[4] $LIST[5]

array=(':zap:' ':fire:' ':sparkles:')
echo ${array[*]}

echo ${array[$(($RANDOM % 3))]}

#  $(($RANDOM % 3))


emoji=(':art:' ':zap:' ':fire:' ':bug:' ':ambulance:' ':sparkles:' ':memo:' ':rocket:' ':lipstick:' ':tada:' ':white_check_mark:' ':lock:' ':closed_lock_with_key:' ':bookmark:' ':rotating_light:' ':construction:' ':green_heart:' ':arrow_down:' ':arrow_up:' ':pushpin:' ':construction_worker:' ':chart_with_upwards_trend:' ':recycle:' ':heavy_plus_sign:' ':heavy_minus_sign:' ':wrench:' ':hammer:' ':globe_with_meridians:' ':pencil2:' ':poop:' ':rewind:' ':twisted_rightwards_arrows:' ':package:' ':alien:' ':truck:' ':page_facing_up:' ':boom:' ':bento:' ':wheelchair:' ':bulb:' ':beers:' ':speech_balloon:' ':card_file_box:' ':loud_sound:' ':mute:' ':busts_in_silhouette:' ':children_crossing:' ':building_construction:' ':iphone:' ':clown_face:' ':egg:' ':see_no_evil:' ':camera_flash:' ':alembic:' ':mag:' ':label:' ':seedling:' ':triangular_flag_on_post:' ':goal_net:' ':dizzy:' ':wastebasket:' ':passport_control:' ':adhesive_bandage:' ':monocle_face:' ':coffin:' ':test_tube:' ':necktie:' ':stethoscope:' ':bricks:' ':technologist:' ':money_with_wings:')

echo ${emoji[$(($RANDOM % 71))]}

git add .

git commit -m "${emoji[$(($RANDOM % 71))]}"


