#### 从零实现React

1. 封装jsx和虚拟DOM
2. 组件和生命周期
3. diff算法
4. 异步的setState

diff算法两个规则：
1. 对比当前真实dom和虚拟dom，在对比过程中直接更新真实dom
2. 只对比同一层级的变化