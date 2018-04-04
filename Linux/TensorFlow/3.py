
import tensorflow as tf
import numpy as np
x = tf.placeholder("float",shape=[None,1])


W = tf.Variable(tf.zeros([1,1]))
b = tf.Variable(tf.zeros([1]))


y = tf.matmul(x,W) +b

y_ = tf.placeholder("float",[None,1])

cost = tf.reduce_sum(tf.pow((y_-y),2))

train_step = tf.train.GradientDescentOptimizer(0.001).minimize(cost)

init = tf.initialize_all_variables()

sess = tf.Session()
sess.run(init)


All_x = np.empty(shape=[1,1])
All_y = np.empty(shape=[1,1])


for i in range(1000):
    x_s = np.random.rand(1,1)

    y_s = np.dot([[0.33]],np.random.rand(1,1)) + 0.33

    feed = {x: x_s, y_: y_s}
    sess.run(train_step,feed_dict=feed)
    print("After %d iteration:"%i)
    print("W : %f"%sess.run(W))
    print("b : %f"%sess.run(b))

    All_x = np.concatenate((All_x,x_s))
    All_y = np.concatenate((All_y,y_s))

print(All_x)
print(All_y)
