package com.didichuxing.datachannel.system.metrcis.factory;

import com.didichuxing.datachannel.system.metrcis.exception.MetricsException;
import com.didichuxing.datachannel.system.metrcis.service.*;

/**
 * 指标服务工厂
 * @author william.hu
 */
public interface MetricsServiceFactory {

    /**
     * @return 创建系统指标服务
     */
    SystemMetricsService createSystemMetrics() throws MetricsException;

    /**
     * @return 创建进程指标服务
     */
    ProcessMetricsService createProcessMetrics();

    /**
     * @return 创建 disk/io 指标服务
     */
    DiskIOMetricsService createDiskIOMetricsService();

    /**
     * @return 创建 disk 指标服务
     */
    DiskMetricsService createDiskMetricsService();

    /**
     * @return 创建 net card 指标服务
     */
    NetCardMetricsService createNetCardMetricsService();

}
