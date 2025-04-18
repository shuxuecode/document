#!/bin/sh

# ll

sleep 1



emoji=(':art:' ':zap:' ':fire:' ':bug:' ':ambulance:' ':sparkles:' ':memo:' ':rocket:' ':lipstick:' ':tada:' ':white_check_mark:' ':lock:' ':closed_lock_with_key:' ':bookmark:' ':rotating_light:' ':construction:' ':green_heart:' ':arrow_down:' ':arrow_up:' ':pushpin:' ':construction_worker:' ':chart_with_upwards_trend:' ':recycle:' ':heavy_plus_sign:' ':heavy_minus_sign:' ':wrench:' ':hammer:' ':globe_with_meridians:' ':pencil2:' ':poop:' ':rewind:' ':twisted_rightwards_arrows:' ':package:' ':alien:' ':truck:' ':page_facing_up:' ':boom:' ':bento:' ':wheelchair:' ':bulb:' ':beers:' ':speech_balloon:' ':card_file_box:' ':loud_sound:' ':mute:' ':busts_in_silhouette:' ':children_crossing:' ':building_construction:' ':iphone:' ':clown_face:' ':egg:' ':see_no_evil:' ':camera_flash:' ':alembic:' ':mag:' ':label:' ':seedling:' ':triangular_flag_on_post:' ':goal_net:' ':dizzy:' ':wastebasket:' ':passport_control:' ':adhesive_bandage:' ':monocle_face:' ':coffin:' ':test_tube:' ':necktie:' ':stethoscope:' ':bricks:' ':technologist:' ':money_with_wings:')

# git commit -m "${emoji[$(($RANDOM % ${#emoji[@]}))]} ${emoji[$(($RANDOM % ${#emoji[@]}))]} ${emoji[$(($RANDOM % ${#emoji[@]}))]}"

echo "${#emoji[@]}"

echo "${emoji[$(($RANDOM % ${#emoji[@]}))]}"

echo "----------------------------------------------------------------------------"
echo -e "\033[36m-------------------------------  git push  --------------------------------- \033[0m"
echo "----------------------------------------------------------------------------"



echo -e "\033[35m 结束了，3秒后关闭 \033[0m"

for e in $(seq 3); do
  echo -n -e "\rplease wait $e..."
  # sleep 1
done


array_length=${#emoji[@]}

min_size=2
max_size=6

random_size=$((RANDOM % (max_size - min_size + 1) + min_size))

echo $random_size

emojis=""

for ((i=0; i<$random_size; i++)); do
  echo "${emoji[i]}"
  emojis+="${emoji[i]}"
done

echo $emojis

# echo RANDOM 
echo $RANDOM


# read
