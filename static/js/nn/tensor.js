//这是神经网络常用可视化操作的实现文件
import * as THREE from "../libs/three.module.js"

//添加神经元隐藏层
function addNeuralLayer(scene, dimensionX, dimensionY, axisPosition = 0, layerType = 0) {

    const geometry = new THREE.SphereBufferGeometry(0.5, 16, 16);
    let material;

    if (layerType === 0)
        material = new THREE.MeshBasicMaterial({color: 0x0099FF});
    else
        material = new THREE.MeshBasicMaterial({color: 0x33FF00});

    const division = 2;       //神经元间距

    //计算神经元总数
    let neural_count = dimensionX * dimensionY;

    //计算坐标系偏置量
    let x_bias = (dimensionX - 1) * division / 2;
    let y_bias = (dimensionY - 1) * division / 2;

    //同层神经元的InstanceMesh
    let layer_mesh = new THREE.InstancedMesh(geometry, material, neural_count);
    scene.add(layer_mesh);

    //实例化神经元
    let neural_node = new THREE.Object3D();
    //神经元矩阵索引
    let matrix_index = 0;
    for (let i = 0; i < dimensionX; i++) {
        for (let j = 0; j < dimensionY; j++) {

            let position_x = division * i - x_bias;
            let position_y = -division * j + y_bias;
            neural_node.position.set(position_x, position_y, axisPosition);
            neural_node.updateMatrix();

            layer_mesh.setMatrixAt(matrix_index++, neural_node.matrix);
        }
    }

    //添加辅助框
    let layer_box = new THREE.Box3();
    layer_box.setFromCenterAndSize(new THREE.Vector3(0, 0, axisPosition),
        new THREE.Vector3(dimensionX * division + 5, dimensionY * division + 5, 4));

    let helper = new THREE.Box3Helper(layer_box, 0x000000);
    scene.add(helper);
}

//添加卷积层
//需要的参数：场景scene，维度x和y，通道数channel，卷积核个数，步长stride，游标位置，颜色类型
function addConvLayer(scene, dimensionX, dimensionY, channels = 1,
                      stride = 1, axisPosition = 0, layerType = 0) {

    const geometry = new THREE.PlaneBufferGeometry(6, 6, 1, 1);
    let material;

    if (layerType === 0)
        material = new THREE.MeshBasicMaterial({color: 0x5F9EA0, side: THREE.DoubleSide});
    else
        material = new THREE.MeshBasicMaterial({color: 0x3CB371, side: THREE.DoubleSide});

    const division = 7;       //神经元间距

    //计算神经元总数
    let kernel_count = dimensionX * dimensionY;

    //计算坐标系偏置量
    let x_bias = (dimensionX - 1) * division / 2;
    let y_bias = (dimensionY - 1) * division / 2;

    //同层神经元的InstanceMesh
    let kernel_mesh = new THREE.InstancedMesh(geometry, material, kernel_count);
    scene.add(kernel_mesh);

    //实例化神经元
    let kernel_node = new THREE.Object3D();
    //神经元矩阵索引
    let matrix_index = 0;
    for (let i = 0; i < dimensionX; i++) {
        for (let j = 0; j < dimensionY; j++) {

            let position_x = division * i - x_bias;
            let position_y = -division * j + y_bias;
            kernel_node.position.set(position_x, position_y, axisPosition);
            kernel_node.updateMatrix();
            kernel_mesh.setMatrixAt(matrix_index++, kernel_node.matrix);
        }
    }

    //添加辅助框
    let layer_box = new THREE.Box3();
    layer_box.setFromCenterAndSize(new THREE.Vector3(0, 0, axisPosition),
        new THREE.Vector3(dimensionX * division, dimensionY * division, 4));

    let helper = new THREE.Box3Helper(layer_box, 0x000000);
    scene.add(helper);

}

//添加池化层
//参数 场景，维度x，维度y，步长stride，类型type
function addPoolLayer(scene, dimensionX, dimensionY, stride = 0,  type = "max", axisPosition = 0) {
    if (type !== "max" && type !== "mean") {
        console.log("unknown pooling type");
    } else {
        const geometry = new THREE.CircleBufferGeometry(3, 16);
        let material;

        if (type === "max")
            material = new THREE.MeshBasicMaterial({color: 0xE9967A, side:THREE.DoubleSide});
        else
            material = new THREE.MeshBasicMaterial({color: 0x2E8B57, side:THREE.DoubleSide});

        let pool_count = dimensionX * dimensionY;
        const division = 7;

        let x_bias = (dimensionX - 1) * division / 2;
        let y_bias = (dimensionY - 1) * division / 2;

        //同层神经元的InstanceMesh
        let pool_mesh = new THREE.InstancedMesh(geometry, material, pool_count);
        pool_mesh.name = ""
        scene.add(pool_mesh);


        //实例化池化元
        let pool_node = new THREE.Object3D();
        //池化元矩阵的索引
        let matrix_index = 0;
        for (let i = 0; i < dimensionX; i++) {
            for (let j = 0; j < dimensionY; j++) {

                let position_x = division * i - x_bias;
                let position_y = -division * j + y_bias;
                pool_node.position.set(position_x, position_y, axisPosition);
                pool_node.updateMatrix();
                pool_mesh.setMatrixAt(matrix_index++, pool_node.matrix);
            }
        }

        //添加辅助框
        let layer_box = new THREE.Box3();
        layer_box.setFromCenterAndSize(new THREE.Vector3(0, 0, axisPosition),
            new THREE.Vector3(dimensionX * division, dimensionY * division, 4));

        let helper = new THREE.Box3Helper(layer_box, 0x000000);
        scene.add(helper);

        //mean green
    }
}

//添加节点连线边,需要输入与前层的连接关系

export {addNeuralLayer, addConvLayer, addPoolLayer};