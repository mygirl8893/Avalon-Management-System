Local Hashrate
--------------

.. code-block:: sql

    UPDATE miner_temp AS a
      LEFT OUTER JOIN (
               SELECT time, ip, port, precise_time, elapsed, total_mh
                 FROM miner
                WHERE time = (SELECT MAX(time) FROM miner)
           ) b
        ON a.ip = b.ip and a.port = b.port
       SET mhs = IF(
             a.precise_time > b.precise_time
                 AND TIMESTAMPDIFF(SECOND, b.precise_time, a.precise_time) >= a.elapsed - b.elapsed - 1
                 AND TIMESTAMPDIFF(SECOND, b.precise_time, a.precise_time) <= a.elapsed - b.elapsed + 1,
             (a.total_mh - b.total_mh) / (a.elapsed - b.elapsed),
             a.total_mh / a.elapsed
           );

Installation
------------

.. code-block:: bash

    apt-get install python3 python3-yaml
    wget http://ftp.ntu.edu.tw/MySQL/Downloads/Connector-Python/mysql-connector-python-1.2.3.tar.gz
    tar zxpfv mysql-connector-python-1.2.3.tar.gz
    cd mysql-connector-python-1.2.3
    python3 setup.py install

    apt-get install libyaml-devel php5-devel
    pecl install yaml


LuCI RPC API
------------

.. code-block:: bash
    curl -X POST -d '{"method":"login","params":["root","password"]}' http://10.42.0.102/cgi-bin/luci/rpc/auth
    curl -X POST -d '{"method":"call","params":["cat /etc/config/cgminer"]}' http://10.42.0.102/cgi-bin/luci/rpc/sys?auth=c4d73142c2904c1fc137dd4c77ffeb16
    curl -X POST -d '{"method":"exec","params":["cat /etc/config/cgminer"]}' http://10.42.0.102/cgi-bin/luci/rpc/sys?auth=c4d73142c2904c1fc137dd4c77ffeb16
