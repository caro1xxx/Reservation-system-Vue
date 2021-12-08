                # 处理app数据库中的日期字段是否是一位数
                x = app_obj.date.split('-')
                a = ''
                b = ''
                c = ''
                if len(x[1]) < 2:
                    a = '0' + x[1]
                else:
                    a = x[1]
                if len(x[2]) < 2:
                    b = '0' + x[2]
                else:
                    b = x[2]
                c = x[0]
                # 重新生成字符串
                newdate = ''
                newdate = newdate + c + '-' + a + '-' + b
                # print(newdate)

                # 把newdate在sch表中的alldate字段
                alldate_obj = models.XueYuan8616.objects.filter(alldate__contains=newdate).first()
                if not alldate_obj:
                    ret['msg'] = '他申请的时间超出范围'
                    ret['code'] = 403
                startdataid = alldate_obj.id
                stopdataid = alldate_obj.id + 27
                # print(stopdataid)

                # 处理时间
                twenty_eight = []
                twenty_eight.append(startdataid)
                twenty_eight.append(stopdataid)
                second_obj = models.XueYuan8616.objects.filter(pk__range=twenty_eight).all()
                # print(second_obj[0].pk)

                # 处理时间
                starttime = app_obj.start_time.split(':')
                stoptime = app_obj.stop_time.split(':')
                starttime_0 = starttime[0]
                starttime_1 = starttime[1]
                stoptime_0 = stoptime[0]
                stoptime_1 = stoptime[1]
                stop = '';
                star = ''
                if len(starttime_1) < 2:
                    star = '0' + starttime_1
                else:
                    star = starttime_1
                if len(stoptime_1) < 2:
                    stop = '0' + stoptime_1
                else:
                    stop = stoptime_1
                star = starttime_0 + ":" + star
                stop = stoptime_0 + ":" + stop
                print(star)
                print(stop)

                # 处理拿到的28条记录
                startpkid = 0  # 在sch表中对应的起始pk号
                stoptpkid = 0  # 在sch表中对应的结束pk号
                for i in range(28):
                    x = second_obj[i].classestime
                    y = x.split('-')
                    # print(y[0])
                    # print(app_obj.start_time)
                    # print(y[0])
                    if (star == y[0]):
                        startpkid = second_obj[i].pk
                        break
                # print(startpkid)
                for i in range(28):
                    x = second_obj[i].classestime
                    y = x.split('-')
                    # print(y[0])
                    if (stop == y[1]):
                        stoptpkid = second_obj[i].pk
                        break
                # print(stoptpkid)

                # 取到这个区间的数据
                any_num = []
                any_num.append(startpkid)
                any_num.append(stoptpkid)
                first_obj = models.XueYuan8616.objects.filter(pk__range=any_num).all()
                # print(first_obj)

                # 获取是星期几
                week_s = first_obj[0].alldate
                week_s = week_s.split('&')
                # print(week_s)
                num = 0
                weeknum = ''
                while num < 7:
                    if week_s[num] == newdate:
                        if num == 0:
                            weeknum = 'sunday'
                            break
                        elif num == 1:
                            weeknum = 'monday'
                            break
                        elif num == 2:
                            weeknum = 'tuesday'
                            break
                        elif num == 3:
                            weeknum = 'wednesday'
                            break
                        elif num == 4:
                            weeknum = 'thursday'
                            break
                        elif num == 5:
                            weeknum = 'friday'
                            break
                        elif num == 6:
                            weeknum = 'saturday'
                            break
                    num += 1
                # print(weeknum)

                # 开始更改状态
                field = weeknum
                suns = stoptpkid - startpkid
                # print(first_obj[1].weeknum)
                models.XueYuan8616.objects.filter(pk__range=any_num).all().update(**{field: '已被预约'})
                # print(1)

                # 更新app表中的state
                app_obj.state = '1'
                app_obj.save()

                # 添加消息
                models.Notice.objects.create(token=token, msg='你的编号为' + str(id) + '的申请已被管理员批准，请自行查看')

                ret['code'] = 200
                ret['msg'] = '成功'