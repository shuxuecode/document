from PIL import Image, ImageSequence
with Image.open('111.gif') as im:
	if im.is_animated:
		frames = [f.copy() for f in ImageSequence.Iterator(im)]
		frames.reverse()
		frames[0].save('222.gif', save_all=True, append_images=frames[1:])