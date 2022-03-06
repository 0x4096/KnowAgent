package com.didichuxing.datachannel.agentmanager.task.resource.dashboard;

import com.didichuxing.datachannel.agentmanager.common.GlobalProperties;
import com.didichuxing.datachannel.agentmanager.common.bean.vo.dashboard.DashBoardVO;
import com.didichuxing.datachannel.agentmanager.core.dashboard.DashboardManageService;
import com.didiglobal.logi.auvjob.annotation.Task;
import com.didiglobal.logi.auvjob.core.job.Job;
import com.didiglobal.logi.auvjob.core.job.JobContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

@Task(name = "DashboardBuildTask", description = "dashboard 构建任务 周期：3分钟/次 ",
        cron = "0 0/1 * * * ?", autoRegister = true)
public class DashboardBuildTask implements Job {

    private static final Logger LOGGER = LoggerFactory.getLogger("DashboardBuildTask");

    @Autowired
    private DashboardManageService dashboardManageService;

    @Override
    public Object execute(JobContext jobContext) throws Exception {
        LOGGER.info("start to run DashboardBuildTask");
        try {
            DashBoardVO dashBoardVO = dashboardManageService.build();
            GlobalProperties.dashBoardVO = dashBoardVO;
        } catch (Exception ex) {
            //TODO：logger
            return String.format("failed!! msg=%s", ex.getMessage());
        }
        return "success";
    }

}