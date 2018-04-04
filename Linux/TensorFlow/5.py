import numpy as np

import matplotlib as mpl
mpl.use('Agg')

import matplotlib.pyplot as pt

x = np.arange(0 , 360)
y = np.sin( x * np.pi / 180.0)
pt.plot(x,y)
pt.xlim(0,360)
pt.ylim(-1.2,1.2)
pt.title("SIN function")
# pt.show()

# ValueError: Format 'jpg' is not supported (supported formats: eps, pdf, pgf, png, ps, raw, rgba, svg, svgz)
pt.savefig("/data/test.png")
