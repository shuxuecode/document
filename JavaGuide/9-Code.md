

- LRU缓存机制
- 数组中第K个最大元素??
- 三数之和
```java
public List<List<Integer>> threeSum(int[] nums) {// 总时间复杂度：O(n^2)
    List<List<Integer>> ans = new ArrayList<>();
    if (nums == null || nums.length <= 2) return ans;

    Arrays.sort(nums); // O(nlogn)

    for (int i = 0; i < nums.length - 2; i++) { // O(n^2)
        if (nums[i] > 0) break; // 第一个数大于 0，后面的数都比它大，肯定不成立了
        if (i > 0 && nums[i] == nums[i - 1]) continue; // 去掉重复情况
        int target = -nums[i];
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            if (nums[left] + nums[right] == target) {
                ans.add(new ArrayList<>(Arrays.asList(nums[i], nums[left], nums[right])));
                
                // 现在要增加 left，减小 right，但是不能重复，比如: [-2, -1, -1, -1, 3, 3, 3], i = 0, left = 1, right = 6, [-2, -1, 3] 的答案加入后，需要排除重复的 -1 和 3
                left++; right--; // 首先无论如何先要进行加减操作
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (nums[left] + nums[right] < target) {
                left++;
            } else {  // nums[left] + nums[right] > target
                right--;
            }
        }
    }
    return ans;
}
```

- Z字打印二叉树
- 股票利润最大化（买卖股票的最佳时机）
```java
public class Solution {
    public int maxProfit(int prices[]) {
        int minprice = Integer.MAX_VALUE;
        int maxprofit = 0;
        for (int i = 0; i < prices.length; i++) {
            if (prices[i] < minprice) {
                minprice = prices[i];
            } else if (prices[i] - minprice > maxprofit) {
                maxprofit = prices[i] - minprice;
            }
        }
        return maxprofit;
    }
}
```
- K个一组翻转链表

```java
public ListNode reverseKGroup(ListNode head, int k) {
    ListNode tail = head;
    for (int i = 0; i < k; i++) {
        //剩余数量小于k的话，则不需要反转。
        if (tail == null) {
            return head;
        }
        tail = tail.next;
    }
    // 反转前 k 个元素
    ListNode newHead = reverse(head, tail);
    //下一轮的开始的地方就是tail
    head.next = reverseKGroup(tail, k);
    return newHead;
}

private ListNode reverse(ListNode head, ListNode tail) {
    ListNode pre = null;
    ListNode next = null;
    while (head != tail) {
        next = head.next;
        head.next = pre;
        pre = head;
        head = next;
    }
    return pre;
}
```

- 无重复字符的最长子串

```java
public int lengthOfLongestSubstring(String s) {
    if (s.length()==0) return 0;
    HashMap<Character, Integer> map = new HashMap<Character, Integer>();
    int max = 0;
    int left = 0;
    for(int i = 0; i < s.length(); i ++){
        if(map.containsKey(s.charAt(i))){
            left = Math.max(left,map.get(s.charAt(i)) + 1);
        }
        map.put(s.charAt(i),i);
        max = Math.max(max,i-left+1);
    }
    return max;
}
```

- 合并K个升序链表
- 链表中倒数第K个节点
- 盛最多水的容器
- 爬楼梯
- 接雨水
- 零钱兑换
- 

## DCL单例模式   Double Check Lock，双重检查锁定

```java
public class Singleton {
    private volatile static Singleton singleton;

    private Singleton(){}

    public static Singleton getInstance(){
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```


## 栈 的方法 ？？


---

## 二叉树遍历

(1) 前序遍历 若二叉树为空，则空操作，否则先访问根节点，再先序遍历左子树，最后先序遍历右子树。 
(2) 中序遍历 若二叉树为空，则空操作，否则先中序遍历左子树，再访问根节点，最后中序遍历右子树。
(3) 后序遍历 若二叉树为空，则空操作，否则先后序遍历左子树访问根节点，再后序遍历右子树，最后访问根节点。
(4) 层次遍历 

![](img/2021-03-26-18-56-17.png)


## 堆排序？？todo



## 二分查找


PriorityQueue
DelayQueue