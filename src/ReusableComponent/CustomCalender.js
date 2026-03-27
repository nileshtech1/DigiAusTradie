import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
    UIManager,
} from 'react-native';
import Colors from '../Assets/Style/Color';
import CustomeCalender from '../utils/Stylesheet/CustomeCalenderStyle';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const colorCategories = [
    { name: 'Residential', color: Colors.green_color },
    { name: 'Store Front', color: Colors.blue_theme_Color },
    { name: 'Quote', color: Colors.banana_Yellow_color },
    { name: 'Reserved', color: Colors.gray_text_color },
    { name: 'Commercial', color: Colors.Neon_Pink_Theme_Color },
    { name: 'Admin/Tasks', color: Colors.pink_theme_color },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalendarList = ({ customer }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [monthsData, setMonthsData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [events, setEvents] = useState({});
    const [quotationList, setQuotationList] = useState([])
    const navigation = useNavigation();
    const { ScheduleList } = useSelector(state => state.ScheduleList)
    const scrollViewRef = useRef(null);
    const [scrollToIndex, setScrollToIndex] = useState(null);
    const [monthHeight, setMonthHeight] = useState(300);
    const today = new Date();
    const [currentMonthIndex, setCurrentMonthIndex] = useState(null);
    const [bookedSlots, setBookedSlots] = useState({});

    useEffect(() => {
        loadBookedSlots();
    }, []);

    const loadBookedSlots = async () => {
        try {
            const slots = await AsyncStorage.getItem('bookedSlots');
            if (slots) {
                setBookedSlots(JSON.parse(slots));
            }
        } catch (error) {
            console.error('Failed to load booked slots from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    useEffect(() => {
        if (ScheduleList && ScheduleList?.Schedule) {
            const groupedEvents = ScheduleList.Schedule.reduce((acc, event) => {
                const eventDate = event.date;

                if (!acc[eventDate]) {
                    acc[eventDate] = [];
                }

                acc[eventDate].push({
                    ...event,
                });

                acc[eventDate].sort((a, b) => convertTimeToMinutes(a.start_time) - convertTimeToMinutes(b.start_time));

                return acc;
            }, {});

            setEvents(groupedEvents);
        }
    }, [ScheduleList]);


    const convertTimeToMinutes = (time) => {
        if (!time || typeof time !== 'string') return 0;
        const [hourMinute, period] = time.split(' ');
        if (!hourMinute) return 0;
        let [hour, minute] = hourMinute.split(':');
        hour = parseInt(hour, 10);
        minute = parseInt(minute, 10);

        if (isNaN(hour) || isNaN(minute)) return 0;

        if (period && period.toUpperCase() === 'PM' && hour !== 12) {
            hour += 12;
        } else if (period && period.toUpperCase() === 'AM' && hour === 12) {
            hour = 0;
        }
        return hour * 60 + minute;
    };


    useEffect(() => {
        if (customer) {
            setCustomerData(customer?.customer)
        }
    }, [customer])

    const getDaysInMonth = (month, year) => {
        const days = [];
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        let startDayIndex = firstDayOfMonth.getDay();
        startDayIndex = startDayIndex === 0 ? 6 : startDayIndex - 1;

        const totalDays = lastDayOfMonth.getDate();

        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

        for (let i = startDayIndex - 1; i >= 0; i--) {
            days.push({
                day: prevMonthLastDay - i,
                overflow: true,
                from: 'prev'
            });
        }

        for (let i = 1; i <= totalDays; i++) {
             days.push({ day: i, overflow: false });
        }

        const totalCells = Math.ceil(days.length / 7) * 7;
        const remaining = totalCells - days.length;
        const nextMonth = (month + 1) % 12;
        const nextYear = month === 11 ? year + 1 : year;


        for (let i = 1; i <= remaining; i++) {
            days.push({
                day: i,
                overflow: true,
                from: 'next',
            });
        }

        return days;
    };


    const handleDatePress = date => {
        navigation.navigate('Job Schedule', { date, customerData });
    };

    const getMonthName = monthIndex => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        return months[monthIndex];
    };

    const generateMonthsData = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const months = [];

        const previousYear = currentYear - 1;

        for (let i = 0; i < 12; i++) {
            months.push({
                month: i,
                year: previousYear,
                daysInMonth: getDaysInMonth(i, previousYear),
            });
        }

        for (let i = 0; i < 12; i++) {
            months.push({
                month: i,
                year: currentYear,
                daysInMonth: getDaysInMonth(i, currentYear),
            });
        }

        setMonthsData(months);

        const currentMonthIndexInGeneratedList = months.findIndex(
            month => month.month === currentMonth && month.year === currentYear
        );

        if (currentMonthIndexInGeneratedList !== -1) {
             setScrollToIndex(currentMonthIndexInGeneratedList + 1);
             setCurrentMonthIndex(currentMonthIndexInGeneratedList + 1);
        } else {
            console.warn("Current month/year not found in generated months data.");
            setScrollToIndex(0);
            setCurrentMonthIndex(0);
        }
    };


    const closeModal = () => {
        setSelectedEvent(null);
    };

    const renderEvents = (date) => {
        const dateEvents = events[date] || [];
        return (
            <ScrollView nestedScrollEnabled={true} style={CustomeCalender.eventsContainer}>
                {dateEvents.length > 0 && (
                    dateEvents.map((event) => (
                        <TouchableOpacity
                        key={event.id}
                        onPress={() => handleDatePress(date)}
                        style={[
                            CustomeCalender.eventBox,
                            { backgroundColor: getEventColor(event) },
                        ]}
                    >
                            <Text
                                style= {[
                                        CustomeCalender.eventText,
                                    { maxWidth: 200 }
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="clip"
                            >
                                {
                                    event.customer_name
                                        ? (event.customer_name.replace(/\s+/g, '').length > 20
                                            ? event.customer_name.replace(/\s+/g, '').substring(0, 20) + "..."
                                            : event.customer_name.replace(/\s+/g, ''))
                                        : "Slot Booked"
                                }
                            </Text>
                            <Text style={CustomeCalender.eventText}>
                                {event.start_time} - {event.end_time}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        );
    };


    const getEventColor = (event) => {
        let type = '';
    
        if (event?.customer_id === null || event?.customer_id === undefined) {
            type = event?.type || '';
        } else {
            type = event?.quotation?.category_type || '';
        }
    
        const lowerCaseType = type.toLowerCase();
    
        switch (lowerCaseType) {
            case 'residential':
                return colorCategories[0].color;
            case 'storefront':
                return colorCategories[1].color;
            case 'quote':
                return colorCategories[2].color;
            case 'reserved':
                return colorCategories[3].color;
            case 'commercial':
                return colorCategories[4].color;
            case 'meeting':
                return colorCategories[5].color;
            default:
                return colorCategories[3].color;
        }
    };

    useEffect(() => {
        generateMonthsData();
    }, []);

    useEffect(() => {
        if (scrollToIndex !== null && scrollToIndex >= 0 && scrollViewRef.current && monthHeight > 0) {
             const yOffset = scrollToIndex * monthHeight;

             scrollViewRef.current.scrollTo({
                y: yOffset,
                animated: true,
            });
        }
    }, [scrollToIndex, monthHeight, monthsData]);


    const handleMonthLayout = (event, index) => {
        const { height } = event.nativeEvent.layout;
        if (height > 0 && Math.abs(monthHeight - height) > 1) {
             setMonthHeight(height);
        } else if (index === 0 && height > 0 && monthHeight !== height) {
             setMonthHeight(height);
        }
    };


    const isToday = (year, month, day) => {
        const todayDate = new Date();
        return (
            todayDate.getFullYear() === year &&
            todayDate.getMonth() === month &&
            todayDate.getDate() === day
        );
    };

    const goToCurrentMonth = () => {
        if (currentMonthIndex !== null && currentMonthIndex >= 0 && scrollViewRef.current && monthHeight > 0) {
             const yOffset = (currentMonthIndex ) * monthHeight;
            scrollViewRef.current.scrollTo({
                y: yOffset,
                animated: true,
            });
        } else {
            console.warn("Could not scroll to current month. Index or ref invalid.");
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: Colors.black_bg_Theme }}>
            <ScrollView
                style={CustomeCalender.container}
                ref={scrollViewRef}
                 onScrollToIndexFailed={info => {
                     const wait = new Promise(resolve => setTimeout(resolve, 500));
                     wait.then(() => {
                         scrollViewRef.current?.scrollTo({ y: info.averageItemLength * info.index, animated: true });
                     });
                 }}
            >
                {monthsData.map((monthData, index) => (
                    <View
                        key={`${monthData.year}-${monthData.month}`}
                        style={CustomeCalender.monthContainer}
                        onLayout={(event) => handleMonthLayout(event, index)}
                    >
                        <Text style={CustomeCalender.monthTitle}>
                            {getMonthName(monthData.month)} {monthData.year}
                        </Text>
                        <View style={CustomeCalender.daysOfWeekContainer}>
                            {daysOfWeek.map((day, i) => (
                                <Text key={i} style={CustomeCalender.dayText}>
                                    {day}
                                </Text>
                            ))}
                        </View>
                        <View style={CustomeCalender.calendarGrid}>
                            {monthData?.daysInMonth?.map((dayInfo, idx) => {
                                const { day, overflow: isOverflow } = dayInfo;

                                const dateString = !isOverflow
                                    ? `${monthData.year}-${(monthData.month + 1).toString().padStart(2, '0')}-${(day.toString().padStart(2, '0'))}`
                                    : '';

                                const isCurrentDay = !isOverflow && isToday(monthData.year, monthData.month, day);

                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[
                                            CustomeCalender.gridCell,
                                            CustomeCalender.gridBorder,
                                        ]}
                                        disabled={isOverflow}
                                        onPress={() => {
                                            if (!isOverflow && day) {
                                                handleDatePress(dateString);
                                            }
                                        }}
                                        activeOpacity={isOverflow ? 1 : 0.7}
                                    >
                                        <View
                                            style={[
                                                CustomeCalender.dateButton,
                                                isOverflow && CustomeCalender.overflowCell,
                                                isCurrentDay && CustomeCalender.todayStyle,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    CustomeCalender.dateText,
                                                    isOverflow && CustomeCalender.overflowDateText,
                                                    isCurrentDay && CustomeCalender.todayTextStyle,
                                                ]}
                                            >
                                                {day}
                                            </Text>
                                        </View>
                                        {!isOverflow && renderEvents(dateString)}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={CustomeCalender.floatingButton}
                onPress={goToCurrentMonth}
            >
                <Text style={CustomeCalender.buttonText}>Today</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CalendarList;